import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { socket } from './socket';
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
        const respond = data => {
            setProvideResponse({
                ...data,
                show: true,
                timer: data.timer
            });

            setTimeout(() => {
                setProvideResponse({
                    question: {},
                    show: false,
                });
            }, data.timer);

            socket.emit('fetch_lesson', lesson.shortId);
        };

        socket.on('connect', () => { });
        socket.on('updated_lesson', data => setLesson(data));
        socket.on('refresh_question', respond);

        return () => {
            socket.off('connect', () => { });
            socket.off('updated_lesson', data => setLesson(data));
            socket.off('refresh_question', respond);
        };
    }, [lesson.shortId]);

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
