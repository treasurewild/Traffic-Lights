import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Lesson from './src/Models/Lesson.model.js'
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { users } from './src/Routes/Auth.route.js';
import { pupil } from './src/Routes/Pupil.route.js';
import { teacher } from './src/Routes/Teacher.route.js';

config({ path: `.env.${process.env.NODE_ENV}` })

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(cors());


const server = http.createServer(app);

app.use('/users', users);
app.use('/pupil', pupil);
app.use('/teacher', teacher);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on('connection', socket => {
    console.log('New user connected.');

    socket.on('disconnect', (reason) => {
        console.log(reason);
    });

    // Joining Lesson as a teacher
    socket.on('join', lessonId => {
        Lesson.findOne({ shortId: lessonId })
            .then(lesson => {
                socket.join(lessonId);
                socket.activeRoom = lessonId;
            })
            .catch(e => {
                console.error(e);
            })
    });

    // Joining Lesson as a pupil
    socket.on('pupil_join', lessonId => {
        socket.join(lessonId);
        socket.activeRoom = lessonId;
    })

    socket.on('ask_question', data => {
        const newQuestion = {
            text: data.question.text,
            responses: [{
                date: new Date(),
                responses: []
            }]
        };
        Lesson.findByIdAndUpdate(data._id, {
            $push: {
                questions: {
                    $each: [newQuestion],
                    $position: 0
                }
            }
        }, { new: true })
            // Logging out of room issue, broadcasting for current testing
            .then(lesson => socket.broadcast.emit('new_question', { lesson: lesson, timer: data.timer }))
            .catch(err => console.log(err))
    });

    socket.on('delete_question', data => {
        Lesson.findById(data.lessonId)
            .then(lesson => {
                lesson.questions.id(data.questionId).deleteOne();
                lesson.save();
                socket.broadcast.emit('updated_lesson', lesson);
                socket.emit('updated_lesson', lesson);
            })
            .catch(err => console.log(err));
    });

    socket.on('delete_responses', data => {
        Lesson.findById(data.lessonId)
            .then(lesson => {
                const question = lesson.questions.id(data.questionId);
                question.responses.id(data.responsesId).deleteOne();
                lesson.save();
                socket.broadcast.emit('updated_lesson', lesson);
                socket.emit('updated_lesson', lesson);
            })
            .catch(err => console.log(err));
    });

    socket.on('delete_lesson', data => {
        Lesson.findByIdAndDelete(data.id)
            .then(() => {
                Lesson.find({ teacher: data.teacher })
                    .then(lessons => socket.emit('updated_lessons', lessons))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err))
    });

    socket.on('fetch_lesson', shortId => {
        Lesson.findOne({ shortId: shortId })
            .then(lesson => socket.emit('updated_lesson', lesson))
            .catch(err => console.log(err));
    });

    socket.on('pupil_response', data => {
        Lesson.findById(data.lessonId)
            .then(lesson => {
                const question = lesson.questions.id(data.questionId);
                question.responses[0].responses.push(data.response);
                lesson.save();
            })
            .catch(err => console.log(err));
    });

    socket.on('refresh_question', data => {
        Lesson.findById(data.lessonId)
            .then(lesson => {
                const question = lesson.questions.id(data.questionId);
                question.responses.unshift({
                    date: new Date(),
                    responses: []
                });
                lesson.save();
                socket.broadcast.emit('refresh_question', { question: question, timer: data.timer });
                //socket.to(lesson.shortId).emit('refresh_question', question);
            })
            .catch(err => console.log(err))
    })

});

io.listen(5000, () => {
    console.log('Listening on PORT 5000');
});

const main = async () => {
    console.log(`Connecting to DB @ ${process.env.DB_URI}`);
    await mongoose.connect(process.env.DB_URI);
    console.log(`Connected to DB @ ${process.env.DB_URI}`);
};

main().catch(err => console.log(err));

const httpServer = app.listen(port, () => {
    const SERVERHOST = httpServer.address().address;
    const SERVERPORT = httpServer.address().port;
    console.log(`Server is listening on http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;