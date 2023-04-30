import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    handle: String,
    name: String,
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }]
});

const User = mongoose.model('User', userSchema);

export default User;