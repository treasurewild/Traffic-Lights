import express from 'express';
import Lesson from '../Models/Lesson.model.js';
import User from '../Models/User.model.js';

const router = express.Router();

router.get('/lesson/:id',
    async (req, res) => {
        await Lesson.findById(req.params.id)
            .populate('questions')
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
                if (lessons)
                    return res.status(200).send(lessons)
                return res.status(204).send({ message: 'No lessons created' })
            })
            .catch(err => res.status(400).send(err));
    })

router.post('/new-lesson',
    async (req, res) => {
        Lesson.create(req.body.lesson)
            .then(lesson => {
                User.findByIdAndUpdate(req.body.lesson.teacher, { $push: { lessons: lesson._id } }, { new: true })
                    .then(user => {
                        if (user === null) {
                            return res.status(204).send({ message: 'Unable to assign lesson to teacher' })
                        }

                        return res.status(200).send({ lesson: lesson, user: user });
                    })

            })
            .catch(err => res.status(400).send(err))
    });

router.delete('/delete-lesson',
    async (req, res) => {
        await Lesson.findByIdAndDelete(req.body.id)
            .then(() => res.status(200).send({ message: 'Deleted successfully' }))
            .catch(err => res.status(400).send(err));
    })

export { router as teacher };