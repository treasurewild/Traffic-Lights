import express from 'express';
import Lesson from '../Models/Lesson.model.js';

const router = express.Router();

router.get('/',
    async (req, res) => {
        try {
            const lesson = await Lesson.findById(req.lessonId)
                .populate('questions');
            res.status(200).json(lesson);
        }
        catch (err) {
            console.log(err);
        }
    });

export { router as teacher };