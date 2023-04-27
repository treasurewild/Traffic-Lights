import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
    {
        shortId: { type: String, required: true, unique: true },
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            default: []
        }]
    });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;