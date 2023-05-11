import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import UserPanel from './UserPanel';
import { getLessonPupil } from '../../Utils/lessonAPI';
import About from './About';
import Development from './Development';

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
            <About />
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
            <Development />
        </div>
    )
}

export default Homepage;