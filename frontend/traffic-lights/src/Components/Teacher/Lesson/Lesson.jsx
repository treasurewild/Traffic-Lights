import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AskQuestion from './AskQuestion';
import Questions from './Questions';
import { socket } from '../../../socket';

const Lesson = ({ lesson }) => {

    const navigate = useNavigate();
    const { shortId, _id, questions, learningObjective, classCode, subject } = lesson;

    const refreshLesson = () => {
        socket.emit('fetch_lesson', shortId);
    }

    return (
        <div className='main'>
            <Button className='m-1 align-self-center' variant='secondary' size='sm' onClick={() => navigate('/teacher')} >
                &#60; Back to Lessons
            </Button>
            <h3 className='alert alert-secondary'>Class code: {shortId}&#160;
                <Button size='sm' variant='secondary' onClick={() => navigator.clipboard.writeText(`${shortId}`)}>Copy Code</Button>
            </h3>

            <h5>Learning Objective: {learningObjective}</h5>
            <h6>Subject:{subject} Class:{classCode}</h6>
            <Button type='button' className='mb-2' size='sm' variant='secondary' onClick={refreshLesson}>Refresh Lesson Data</Button>
            {/* <ConnectionState isConnected={isConnected} shortId={shortId} /> */}
            {/* <ConnectionManager /> */}
            <AskQuestion shortId={shortId} _id={_id} />
            <Questions lessonId={_id} questions={questions} /></div>
    )
}

export default Lesson