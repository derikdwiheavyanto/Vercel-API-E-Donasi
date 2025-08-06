class AppResponse<T> {
  status: number;
  message: string;
  data: T;
  constructor(status: number, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success<T>(
    message: string = "Success",
    data: T | null = null
  ): AppResponse<T> {
    if (data) {
      return new AppResponse(200, message, data);
    } else {
      return { status: 200, message: message } as AppResponse<T>;
    }
  }

  static error(message: string, status: number = 500) {
    return { status, message };
  }

  static validationError(message: string) {
    return { status: 400, message: message };
  }
}

export default AppResponse;
