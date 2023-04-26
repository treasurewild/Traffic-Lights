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

function App() {

    const [isConnected, setIsConnected] = useState(socket.connected);
    const [questions, setQuestions] = useState([]);
    const [lesson, setLesson] = useState({});
    //const [lessonId, setLessonId] = useState('');

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
        };

        const onDisconnect = () => {
            setIsConnected(false);
        };

        const teacherQuestion = question => {
            setQuestions(previous => [question, ...previous])
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('new_question', data => setLesson(data));
        socket.on('teacher_question', teacherQuestion);
        socket.on('joined', data => setLesson(data));
        socket.on('updated_lesson', data => setLesson(data));

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('new_question', data => setLesson(data));
            socket.off('teacher_question', teacherQuestion);
            socket.off('joined', data => setLesson(data));
            socket.off('updated_lesson', data => setLesson(data));

        };
    }, []);

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Homepage socket={socket} />} />
                <Route path='/teacher' element={<Teacher isConnected={isConnected} questions={questions} lesson={lesson} />} />
                <Route path='/pupil' element={<Pupil isConnected={isConnected} lesson={lesson} />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
