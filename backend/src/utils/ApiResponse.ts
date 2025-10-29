class ApiResponse {
  statusCode: number;
  message: string;
  data?: any;
  token?: any;
  constructor(statusCode: number, message: string, data?: any, token?: any) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.token = token;
  }
}

export { ApiResponse };
