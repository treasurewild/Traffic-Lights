import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
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

    socket.on('ask_question', question => {
        const newQuestion = { _id: question._id, text: question.text }
        socket.broadcast.emit('new_question', newQuestion);
    })

});

io.listen(4000, () => {
    console.log('Listening on PORT 4000');
});

export default server;