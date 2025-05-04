export interface ApiResponse<T> {
    data?: T;
    error?: string;
    status: number;
  }
  
  export interface ApiErrorResponse {
    detail: string;
    status_code: number;
  }