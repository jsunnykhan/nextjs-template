import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';

class HttpClient {
  private axiosInstance: AxiosInstance;
  private maxRetries: number = 2;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token =
          typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
          _retryCount?: number;
        };

        // Handle authentication errors
        if (error.response?.status === 401) {
          this.redirectToLogin();
          return Promise.reject(error);
        }

        // Retry logic for network errors or 5xx errors
        if (
          this.shouldRetry(error) &&
          originalRequest &&
          !originalRequest._retry
        ) {
          originalRequest._retryCount = originalRequest._retryCount || 0;

          if (originalRequest._retryCount < this.maxRetries) {
            originalRequest._retryCount++;
            originalRequest._retry = true;

            // Wait before retrying (exponential backoff)
            await this.delay(Math.pow(2, originalRequest._retryCount) * 1000);

            return this.axiosInstance(originalRequest);
          }
        }

        // If all retries failed, redirect to login
        if (originalRequest?._retryCount === this.maxRetries) {
          this.redirectToLogin();
        }

        return Promise.reject(error);
      }
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    // Retry on network errors or 5xx server errors
    return (
      !error.response ||
      error.code === 'NETWORK_ERROR' ||
      error.code === 'TIMEOUT' ||
      (error.response.status >= 500 && error.response.status < 600)
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private redirectToLogin(): void {
    if (typeof window !== 'undefined') {
      // Clear any stored auth data
      localStorage.removeItem('token');
      // Redirect to login page
      window.location.href = '/auth/login';
    }
  }

  // HTTP Methods
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  // Get the axios instance for advanced usage
  getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Export a singleton instance
export const httpClient = new HttpClient();
export default httpClient;
