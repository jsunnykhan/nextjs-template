import httpClient from './httpClient';

class ApiService {
  login(data: LoginCredentials): Promise<LoginResponse> {
    return httpClient.post('/auth/login', data).then((res) => res.data.data);
  }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;
