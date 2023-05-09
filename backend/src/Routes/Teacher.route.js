import express from 'express';
import Lesson from '../Models/Lesson.model.js';

const router = express.Router();

router.get('/lesson/:id',
    async (req, res) => {
        await Lesson.findById(req.params.id)
            .then(lesson => {
                if (!lesson)
                    return res.status(204)
                return res.status(200).send(lesson)
            })
            .catch(err => res.status(400).send(err))
    });

router.get('/lessons/:teacherId',
    async (req, res) => {
        await Lesson.find({ teacher: req.params.teacherId })
            .then(lessons => {
                if (lessons.length > 0)
                    return res.status(200).send(lessons)
                return res.status(204).send({ message: 'No lessons created' })
            })
            .catch(err => res.status(400).send(err));
    })

router.post('/new-lesson',
    async (req, res) => {
        Lesson.create(req.body)
            .then(lesson => res.status(200).send({ lesson: lesson }))
            .catch(err => res.status(400).send(err));
    });

router.delete('/delete-lesson/:id',
    async (req, res) => {
        await Lesson.findByIdAndDelete(req.params.id)
            .then(() => res.status(200))
            .catch(err => res.status(400).send(err));
    })

export { router as teacher };