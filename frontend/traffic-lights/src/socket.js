import { io } from 'socket.io-client';

const URL = 'https://traffic-lights.onrender.com:5000';

export const socket = io(URL);