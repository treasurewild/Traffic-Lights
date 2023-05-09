import mongoose from 'mongoose';

const responseSchema = new mongoose.Schema(
    {
        date: String,
        responses: [{
            type: String
        }]
    });

const questionSchema = new mongoose.Schema(
    {
        text: String,
        responses: [responseSchema]
    });

const lessonSchema = new mongoose.Schema(
    {
        shortId: { type: String, required: true, unique: true },
        questions: [questionSchema],
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