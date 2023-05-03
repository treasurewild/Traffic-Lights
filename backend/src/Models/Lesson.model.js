import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
    {
        shortId: { type: String, required: true, unique: true },
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            default: []
        }],
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        learningObjective: String,
        classCode: String,
        subject: String,
        level: String
    });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;