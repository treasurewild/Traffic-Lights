import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { socket } from './socket.js';
import ConnectionState from './Sockets/ConnectionState.js';
import { useState, useEffect } from 'react';
import Footer from './Components/Page/Footer';
import Header from './Components/Page/Header';
import Homepage from './Components/Homepage/Homepage';
import Pupil from './Components/Pupil/Pupil';
import Teacher from './Components/Teacher/Teacher';

function App() {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        const onQuestion = question => {
            setQuestions(previous => [question, ...previous]);;
        }

        const teacherQuestion = question => {
            setQuestions(previous => [question, ...previous])
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('new_question', onQuestion);
        socket.on('teacher_question', teacherQuestion);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('new_question', onQuestion);
            socket.off('teacher_question', teacherQuestion);

        };
    }, [socket]);

    return (
        <div>
            <Header />
            <h1>Welcome to Traffic Lights</h1>
            <ConnectionState isConnected={isConnected} />
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/teacher' element={<Teacher questions={questions} />} />
                <Route path='/pupil' element={<Pupil questions={questions} />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
