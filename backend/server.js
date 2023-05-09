import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Lesson from './src/Models/Lesson.model.js'
import mongoose from 'mongoose';
import { config } from 'dotenv';
import { users } from './src/Routes/Auth.route.js';
import { roles } from './src/Routes/Roles.route.js';
import { pupil } from './src/Routes/Pupil.route.js';
import { teacher } from './src/Routes/Teacher.route.js';

config({ path: `.env.${process.env.NODE_ENV}` })

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(cors());


const server = http.createServer(app);

app.use('/users', users);
app.use('/pupil', pupil)
app.use('/roles', roles);
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
    socket.on('join', async (lessonId, callback) => {
        try {
            let result = await Lesson.findOne({ shortId: lessonId })
                .populate('questions');

            if (!result) {
                result = new Lesson({ shortId: lessonId })
                result.save();
            }

            socket.join(lessonId);
            socket.activeRoom = lessonId;

            callback({
                lesson: result,
            });

        } catch (e) {
            console.error(e);
        }
    });

    // Joining Lesson as a pupil
    socket.on('pupil_join', async (lessonId, callback) => {
        try {
            let result = await Lesson.findOne({ shortId: lessonId })
                .populate('questions');

            socket.join(lessonId);
            socket.activeRoom = lessonId;

            callback({
                lesson: result,
            });

        } catch (e) {
            console.error(e);
        }
    });

    socket.on('ask_question', async data => {
        const newQuestion = {
            text: data.question.text,
            responses: [{
                date: new Date(),
                responses: []
            }]
        };
        await Lesson.findByIdAndUpdate(data._id, {
            $push: {
                questions: {
                    $each: [newQuestion],
                    $position: 0
                }
            }
        }, { new: true })
            // .then(lesson => socket.to(lesson.shortId).emit('refresh_question', lesson.questions[0]))
            // Logging out of room issue, broadcasting for current testing
            .then(lesson => socket.broadcast.emit('new_question', lesson))
            .catch(err => console.log(err))
    });

    socket.on('delete_question', async data => {
        await Lesson.findById(data.lessonId)
            .then(lesson => {
                lesson.questions.id(data.questionId).deleteOne();
                lesson.save();
                socket.broadcast.emit('updated_lesson', lesson);
                socket.emit('updated_lesson', lesson);
            })
            .catch(err => console.log(err));
    });

    socket.on('delete_lesson', async data => {
        await Lesson.findByIdAndDelete(data.id);
        // Do I need to keep sending this data? Should be stored in state and only sent again if GET request received?
        const lessons = await Lesson.find({ teacher: data.teacher });

        socket.emit('updated_lessons', lessons);
    });

    socket.on('fetch_lesson', async shortId => {
        await Lesson.findOne({ shortId: shortId })
            .then(lesson => socket.emit('updated_lesson', lesson))
            .catch(err => console.log(err));
    });

    socket.on('pupil_response', async data => {
        await Lesson.findById(data.lessonId)
            .then(lesson => {
                const question = lesson.questions.id(data.questionId);
                question.responses[0].responses.push(data.response);
                lesson.save();
            })
            .catch(err => console.log(err));
    });

    socket.on('refresh_question', async data => {
        await Lesson.findById(data.lessonId)
            .then(lesson => {
                const question = lesson.questions.id(data.questionId);
                question.responses.unshift({
                    date: new Date(),
                    responses: []
                });
                lesson.save();
                socket.broadcast.emit('refresh_question', question);
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