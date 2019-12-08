class ErrorExtend extends Error {
  error?: any;
  status: number;
  isPublic: boolean;
  isOperational: boolean;
  constructor({message, error, status, isPublic, isOperational, stack}) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.error = error;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = isOperational;
    this.stack = stack;
  }
}

export class APIError extends ErrorExtend {
  constructor({
    message,
    error = {},
    status,
    isPublic = false,
    isOperational = false,
    stack = undefined
  }) {
    super({
      message,
      error,
      status,
      isPublic,
      isOperational,
      stack
    });
  }
}
