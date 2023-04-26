import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';

const Homepage = () => {

    const navigate = useNavigate();
    const [pupilLesson, setPupilLesson] = useState('');
    const [teacherLesson, setTeacherLesson] = useState('');

    const joinLessonPupil = (event) => {
        event.preventDefault();

        socket.emit('join', pupilLesson)
        navigate('/pupil');
    }

    const joinLessonTeacher = async () => {

        socket.emit('join', teacherLesson)
        navigate('/teacher')
    }

    return (
        <div className='m-2 '>
            <h1>Welcome to Traffic Lights</h1>
            <Form className='m-2' onSubmit={joinLessonTeacher}>
                <h3>Teacher</h3>
                <Form.Control type='text' placeholder='Enter lesson code...' onChange={e => setTeacherLesson(e.target.value)} />
                <Button className='mt-1 btn-warning' type='submit'>
                    Create New Lesson
                </Button>
            </Form>
            <Form className='m-2' onSubmit={joinLessonPupil}>
                <h3>Pupil</h3>
                <Form.Control type='text' placeholder='Enter lesson code...' onChange={e => setPupilLesson(e.target.value)} />
                <Button className='mt-1 btn-success' type='submit'>
                    Join Lesson
                </Button>
            </Form>
        </div>
    )
}

export default Homepage;