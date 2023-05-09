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

    const [lesson, setLesson] = useState({});
    const [provideResponse, setProvideResponse] = useState({ question: {}, show: false });

    useEffect(() => {
        const respond = question => {
            setProvideResponse({
                ...question,
                show: true
            });

            setTimeout(() => {
                setProvideResponse({
                    question: {},
                    show: false
                });
            }, 10000);
        };

        const handleNewQuestion = data => {
            setLesson(data);
            respond(data.questions[0]);
        }

        socket.on('new_question', handleNewQuestion);
        socket.on('joined', data => setLesson(data));
        socket.on('updated_lesson', data => setLesson(data));
        socket.on('refresh_question', respond);

        return () => {
            socket.off('new_question', handleNewQuestion);
            socket.off('joined', data => setLesson(data));
            socket.off('updated_lesson', data => setLesson(data));
            socket.off('refresh_question', respond);
        };
    }, []);

    return (
        <div>
            <Header />
            <Routes>
                <Route path='/' element={<Homepage setLesson={setLesson} />} />
                <Route path='/teacher' element={<Teacher setLesson={setLesson} />} />
                <Route path='/pupil/:id' element={<Pupil lesson={lesson} setLesson={setLesson} provideResponse={provideResponse} />} />
                <Route path='/teacher/lesson/:id' element={<Lesson lesson={lesson} />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
