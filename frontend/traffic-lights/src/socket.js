import { io } from 'socket.io-client';

const URL = 'http://localhost:5000';

export const socket = io(URL,
    {
        reconnectionDelay: 10000, // defaults to 1000
        reconnectionDelayMax: 10000 // defaults to 5000
    });