import bcrypt from 'bcrypt';

export class PasswordManager {

    private static _saltRounds = 10;

    static async toHash(password: string) {
        return await bcrypt.hash(password, this._saltRounds);
    }

    static async compare(passwordHash: string, password: string) {
        return await bcrypt.compare(password, passwordHash);
    }
}
