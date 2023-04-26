import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
    {
        shortId: { type: String, required: true, unique: true },
        learningObjective: String,
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }],
    });

const Lesson = mongoose.model('Lesson', lessonSchema);

export default Lesson;