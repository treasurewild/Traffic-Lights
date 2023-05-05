import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import UserPanel from './UserPanel';

const Homepage = ({ setLesson, setLessons }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();
    const [pupilLesson, setPupilLesson] = useState('');

    const joinLessonPupil = () => {

        socket.emit('pupil_join', pupilLesson, response => {
            setLesson(response.lesson);
        });

        navigate(`/pupil/${pupilLesson}`);
    }

    const goToLessons = () => {
        navigate('/teacher')
    }

    return (
        <div className='main'>
            <h1>Welcome to Traffic Lights</h1>
            <div className='alert alert-danger'>
                <h4>How to Use Traffic Lights</h4>
                <p>Traffic Lights is a simple tool for class feedback when teaching remotely.</p>
                <p>Teachers ask questions and get Green-Amber-Red feedback from the class to gauge progress and understanding. This knowledge allows them guide their lesson, differentiate tasks and informs future learning.</p>
                <p>Teachers can save lesson data for reference, and even create templates to reuse for future lessons.</p>
            </div>
            {user?.accessToken ?
                <div className='d-grid'>
                    <Button variant='warning' className='mb-3' size='lg' onClick={goToLessons}>Go to Lessons</Button>
                </div>
                :
                <UserPanel setLessons={setLessons} />
            }
            <div className='alert alert-success'>

                <Form onSubmit={joinLessonPupil}>
                    <h3>Pupil</h3>
                    <FloatingLabel controlId="pupil" label="Lesson Code" className="mb-1">
                        <Form.Control type='text' placeholder='Enter lesson code...' onChange={e => setPupilLesson(e.target.value)} required />
                    </FloatingLabel>
                    <Button className='mt-1 btn-success' type='submit'>
                        Join Lesson
                    </Button>
                </Form>
            </div>
            <div className='alert alert-secondary'>
                <p >Traffic Lights is a demo App created by Wil Treasure.</p>
                <p><strong>Please don't add sensitive personal information!</strong></p>
                <p>It's created using the following technologies: ReactJS, Mongoose, Express, Node, Short-Unique-ID, and Socket.io.
                    <br />It uses Bootstrap and React Bootstrap for styling.</p>
            </div>
        </div>
    )
}

export default Homepage;