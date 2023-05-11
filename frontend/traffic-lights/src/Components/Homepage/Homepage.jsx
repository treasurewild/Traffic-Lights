import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import UserPanel from './UserPanel';
import { getLessonPupil } from '../../Utils/lessonAPI';

const Homepage = ({ setLesson, setLessons }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();
    const [pupilLesson, setPupilLesson] = useState('');
    const [message, setMessage] = useState('');

    const joinLessonPupil = async (e) => {

        e.preventDefault();

        const res = await getLessonPupil(pupilLesson);

        if (res.status === 200) {
            setLesson(res.lesson);
            socket.emit('join', pupilLesson);
            navigate(`/pupil/${pupilLesson}`);
            return;
        }

        setMessage(res.message);
        setTimeout(() => {
            setMessage('');
        }, 3000);
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
                    <Button variant='warning' className='mb-3' size='lg' onClick={() => navigate('/teacher')}>Go to Lessons</Button>
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
                    {message && <p className='m-1 alert alert-danger'>{message}</p>}
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