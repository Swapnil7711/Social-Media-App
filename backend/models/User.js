import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
    firstName: { type: String, required: true },// String is shorthand for {type: String}
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    profileUrl: { type: String, required: false },
    password: { type: String, required: true },
}, { timestamp: true });

export default mongoose.model('User', userSchema, 'users');