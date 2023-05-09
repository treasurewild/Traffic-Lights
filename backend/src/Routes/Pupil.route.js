import express from 'express';
import Lesson from '../Models/Lesson.model.js';

const router = express.Router();

router.get('/:id',
    async (req, res) => {
        await Lesson.find({ shortId: req.params.id })
            .then(lesson => {
                if (!lesson)
                    return res.status(204)
                return res.status(200).send(lesson)
            })
            .catch(err => res.status(400).send(err))
    });

export { router as pupil };