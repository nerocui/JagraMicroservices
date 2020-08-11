import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
    public reason: string = 'Error connecting to database';
    public statusCode: number = 500;
    constructor(message?: string) {
        super(`[Database Connection Error] ${message}`);
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [
            {
                message: this.reason
            },
        ];
    }
}
