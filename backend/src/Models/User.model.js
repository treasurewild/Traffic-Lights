import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    lessons: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    }],
    roles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
    }]
});

const User = mongoose.model('User', userSchema);

export default User;