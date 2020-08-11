import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
    public statusCode: number = 400;
    constructor(public message: string) {
        super(`[Bad Request Error] ${message}`);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [
            {
                message: this.message
            },
        ];
    }
}
