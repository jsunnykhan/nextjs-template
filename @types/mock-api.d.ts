type MockResponse<T> = {
  status: number;
  error?: any;
  message?: string;
  data: T;
};
