import { BaseError } from './BaseError';

export class AppError extends BaseError {
  constructor(public code: string, public message: string, public status?: number) {
    super(message);
  }

  toString(): string {
    return `${this.code} ${this.message}\n${this.stack}`;
  }
}
