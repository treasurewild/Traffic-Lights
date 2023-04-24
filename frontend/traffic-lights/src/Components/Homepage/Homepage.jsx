import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {

    const navigate = useNavigate();
    const [pupilLesson, setPupilLesson] = useState('');
    const [teacherLesson, setTeacherLesson] = useState('');

    const joinLesson = () => {
        navigate('/pupil');
    }

    const newLesson = () => {
        navigate('/teacher')
    }

    return (
        <>
            <Form className='m-2' onSubmit={newLesson}>
                <h3>Teacher</h3>
                <Form.Control type='text' placeholder='Enter lesson code...' onChange={e => setTeacherLesson(e.target.value)} />
                <Button className='mt-1 btn-warning' type='submit'>
                    Create New Lesson
                </Button>
            </Form>
            <Form className='m-2' onSubmit={joinLesson}>
                <h3>Pupil</h3>
                <Form.Control type='text' placeholder='Enter lesson code...' onChange={e => setPupilLesson(e.target.value)} />
                <Button className='mt-1 btn-success' type='submit'>
                    Join Lesson
                </Button>
            </Form>
        </>
    )
}

export default Homepage;