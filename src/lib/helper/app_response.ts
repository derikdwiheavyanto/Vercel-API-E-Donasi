class AppResponse<T> {
  status: number;
  message: string;
  data: T;
  constructor(status: number, message: string, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success<T>(message: string = "Success", data: T): AppResponse<T> {
    return new AppResponse(200, message, data);
  }

  static error(message: string, status: number = 500) {
    return { status, message };
  }
}

export default AppResponse;
