import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
    public statusCode = 404;

    constructor() {
        super('[Not Found Error] Route not found');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    public serializeErrors() {
        return [
            {
                message: 'Not Fount'
            }
        ];
    }
}