import express from 'express';
import { verifyToken } from '../Middlewares/authJWT.js';
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

router.get('/lessons', [verifyToken],
    async (req, res) => {
        await Lesson.find({ teacher: req.userId })
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

router.put('/delete-lesson', [verifyToken],
    async (req, res) => {
        await Lesson.findByIdAndDelete(req.body.lessonId)
            .then(() => res.status(200).send())
            .catch(err => res.status(400).send(err));
    })

export { router as teacher };