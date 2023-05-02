import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Lesson from './src/Models/Lesson.model.js'
import mongoose from 'mongoose';
import { config } from 'dotenv';
import Question from './src/Models/Question.model.js';
import { users } from './src/Routes/Auth.route.js';
import { roles } from './src/Routes/Roles.route.js';

config({ path: `.env.${process.env.NODE_ENV}` })

const port = process.env.PORT;
const app = express();
app.use(bodyParser.json());
app.use(cors());


const server = http.createServer(app);

app.use('/users', users);
app.use('/roles', roles);

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
        const newQuestion = await Question.create({ shortId: data.question.shortId, text: data.question.text, responses: [] });
        const lesson = await Lesson.findByIdAndUpdate(data._id, {
            $push: {
                questions: {
                    $each: [newQuestion],
                    $position: 0
                }
            }
        }, { new: true })
            .populate('questions');

        // Send question to all except Teacher
        socket.to(lesson.shortId).emit('new_question', lesson);
    });

    socket.on('delete_question', async data => {

        const lesson = await Lesson.findByIdAndUpdate(data.lessonId, {
            $pull: { questions: data.questionId }
        }, { new: true })
            .populate('questions');

        await Question.findByIdAndDelete(data.questionId);

        socket.to(lesson.shortId).emit('updated_lesson', lesson);
        socket.emit('updated_lesson', lesson);
    })

    socket.on('fetch_lesson', async shortId => {
        const lesson = await Lesson.findOne({ shortId: shortId })
            .populate('questions');

        socket.emit('updated_lesson', lesson);
    });

    socket.on('pupil_response', async data => {
        await Question.findOneAndUpdate({ shortId: data.shortId }, {
            $push: {
                responses: data.response
            }
        });
    });

    socket.on('pupil_response_reset', async data => {
        const question = await Question.findOne({ shortId: data.shortId });

        const index = question.responses.indexOf(data.response);
        question.responses.splice(index, 1);

        question.save();
    });

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