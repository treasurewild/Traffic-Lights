import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import Lesson from './src/Models/Lesson.model.js';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import Question from './src/Models/Question.model.js';
// import { teacher } from './src/Routes/Teacher.route.js';

config({ path: `.env.${process.env.NODE_ENV}` })

const port = process.env.PORT;
const app = express();
app.use(cors());
// app.use('/teacher', teacher)
const server = http.createServer(app);

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

    // Joining Lesson
    socket.on('join', async (lessonId) => {
        try {
            let result = await Lesson.findOne({ shortId: lessonId })
                .populate('questions');

            if (!result) {
                result = await Lesson.create({ "shortId": lessonId, questions: [] });
            }

            socket.join(lessonId);
            socket.emit("joined", result);
            socket.activeRoom = lessonId;
        } catch (e) {
            console.error(e);
        }
    });

    socket.on('ask_question', async data => {

        const newQuestion = await Question.create({ shortId: data.question.shortId, text: data.question.text, responses: [] });
        const lesson = await Lesson.findOneAndUpdate({ shortId: socket.activeRoom }, {
            $push: {
                questions: {
                    $each: [newQuestion],
                    $position: 0
                }
            }
        }, { new: true })
            .populate('questions');

        // Send question to all pupils
        socket.to(socket.activeRoom).emit('new_question', lesson);
        // Send question to Teacher
        socket.emit('new_question', lesson);
    });

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
        }, { new: true });
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

server.listen(port, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is listening on http://${SERVERHOST}:${SERVERPORT}`);
});

export default server;