import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

// Models
import Lesson from './src/Models/Lesson.model.js'

// Routes
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
        origin: process.env.ORIGIN
    },
    connectionStateRecovery: {
        // the backup duration of the sessions and the packets (2 minutes)
        maxDisconnectionDuration: 2 * 60 * 1000,
        // skip middlewares upon successful recovery
        skipMiddlewares: true,
    }
});

// Creating socket and response criteria
io.on('connection', socket => {

    if (socket.recovered) {
        console.log('Session recovered')
    } else {
        // new or unrecoverable session
        console.log('New user connected.');
    }

    socket.on('disconnect', (reason) => {
        console.log(reason);
    });

    // Joining Lesson as a teacher
    socket.on('join', lessonId => {
        Lesson.findOne({ shortId: lessonId })
            .then(() => {
                socket.join(lessonId);
                socket.activeRoom = lessonId;
            })
            .catch(err => {
                console.error(err);
            })
    });

    socket.on('ask_question', data => {
        const newQuestion = {
            text: data.question,
            responses: [{
                date: new Date(),
                responses: []
            }]
        };

        Lesson.findById(data._id)
            .then(lesson => {

                // Places new question at position 0 in the array
                lesson.questions.unshift(newQuestion);
                lesson.save();
                socket.to(lesson.shortId).emit('refresh_question', { text: data.question, questionId: lesson.questions[0]._id, timer: data.timer });
            })
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
                // Places new question at position 0 in the array
                question.responses.unshift({
                    date: new Date(),
                    responses: []
                });
                lesson.save();
                io.to(lesson.shortId).emit('refresh_question', { text: question.text, questionId: question._id, timer: data.timer });
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