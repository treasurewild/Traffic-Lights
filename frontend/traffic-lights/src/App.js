import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { socket } from './socket.js';
import { useState, useEffect } from 'react';
import Footer from './Components/Page/Footer';
import Header from './Components/Page/Header';
import Homepage from './Components/Homepage/Homepage';
import Pupil from './Components/Pupil/Pupil';
import Teacher from './Components/Teacher/Teacher';
import Lesson from './Components/Teacher/Lesson/Lesson';

function App() {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lesson, setLesson] = useState({});

    useEffect(() => {

        socket.on('connect', () => setIsConnected(true));
        socket.on('disconnect', () => setIsConnected(false));
        socket.on('new_question', data => setLesson(data));
        socket.on('joined', data => setLesson(data));
        socket.on('updated_lesson', data => setLesson(data));

        return () => {
            socket.off('connect', () => setIsConnected(true));
            socket.off('disconnect', () => setIsConnected(false));
            socket.off('new_question', data => setLesson(data));
            socket.off('joined', data => setLesson(data));
            socket.off('updated_lesson', data => setLesson(data));
        };
    }, []);

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Homepage setLesson={setLesson} />} />
                <Route path='/teacher' element={<Teacher setLesson={setLesson} />} />
                <Route path='/pupil/:id' element={<Pupil lesson={lesson} />} />
                <Route path='/teacher/lesson/:id' element={<Lesson lesson={lesson} />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
