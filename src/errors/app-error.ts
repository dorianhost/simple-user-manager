export class AppError extends Error {
  constructor(public code: string, public message: string, public status?: number) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  toString(): string {
    return `${this.code} ${this.message}\n${this.stack}`;
  }
}
