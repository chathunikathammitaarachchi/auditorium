import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },  // Ensure 'required' is set to true
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' }
});


const UserModel = mongoose.model("Admin_User", UserSchema)

export {UserModel as User}