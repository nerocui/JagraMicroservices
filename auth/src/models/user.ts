import mongoose from 'mongoose';
import { PasswordManager } from '../services/password-manager';

// An interface that describes the props
// that are required to create a new user
interface UserAttrs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

// An interface that describes the props
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(atttrs: UserAttrs): UserDoc;
}

// An interface that describes the props
// that a User Document has
interface UserDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

//cannot use arrow function because this context
userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
        const passwordhash = await PasswordManager.toHash(this.get('password'));
        this.set('password', passwordhash);
        done();
    }
});

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

User.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

export { User };
