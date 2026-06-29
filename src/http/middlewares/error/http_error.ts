import { HTTP_STATUS } from "../../routes/shared/httpStatus";

export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export class BadRequestError extends HttpError {
  constructor(message = 'Bad Request') {
    super(HTTP_STATUS.BAD_REQUEST, message);
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}

export class ConflictError extends HttpError {
  constructor(message = 'Conflict') {
    super(HTTP_STATUS.CONFLICT, message);
  }
}