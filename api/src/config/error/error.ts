export interface ServerErrorResponse {
  status: number;
  message: string;
}

export class ServerError extends Error {
  message: string;
  status: number;

  constructor({ message, status }: ServerErrorResponse) {
    super(message || "HTTP 오류");
    this.message = message;
    this.status = status;
  }
}
