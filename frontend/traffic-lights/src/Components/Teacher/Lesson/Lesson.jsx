import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import AskQuestion from './AskQuestion';
import Questions from './Questions';
import { socket } from '../../../socket';
import Delete from '../../Page/Delete';

const Lesson = ({ lesson }) => {

    const navigate = useNavigate();
    const { shortId, _id, learningObjective, classCode, subject } = lesson;
    const [isLoading, setIsLoading] = useState(false);
    const [timer, setTimer] = useState(10000);
    const [copied, setCopied] = useState(false);

    const refreshLesson = () => {
        socket.emit('fetch_lesson', shortId);
    }

    const handleClick = () => {
        setCopied(true);
        navigator.clipboard.writeText(`${shortId}`);
        setTimeout(() => {
            setCopied(false);
        }, 3000);
    }

    return (
        <div className='main'>
            <Button className='m-1 align-self-center' variant='secondary' size='sm' onClick={() => navigate('/teacher')} >
                &#60; Back to Lessons
            </Button>
            <Delete />

            <Row className='alert alert-info'>
                <Col md='6'>
                    <h6 className='text-muted'>Learning Objective:</h6>
                    <h4>{learningObjective}</h4>
                </Col>
                <Col md='2'>
                    <h5>Subject: <strong>{subject}</strong><br />Class: <strong>{classCode}</strong></h5>
                </Col>
                <Col >
                    <h5 className='alert alert-light'>
                        Class code:&nbsp;
                        <Button size='lg' variant='secondary' onClick={() => handleClick()}>{copied ? 'Copied' : `${shortId}`}</Button>
                    </h5>
                </Col>
            </Row>
            <Button type='button' className='mb-2' size='sm' variant='secondary' onClick={refreshLesson}>Refresh Lesson Data</Button>
            <AskQuestion timer={timer} setTimer={setTimer} isLoading={isLoading} setIsLoading={setIsLoading} shortId={shortId} _id={_id} />
            <Questions timer={timer} isLoading={isLoading} setIsLoading={setIsLoading} lesson={lesson} />
        </div >
    )
}

export default Lesson;