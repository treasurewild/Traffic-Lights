import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import AskQuestion from './AskQuestion';
import Questions from './Questions';
import { socket } from '../../../socket';

const Lesson = ({ lesson }) => {

    const navigate = useNavigate();
    const { shortId, _id, learningObjective, classCode, subject } = lesson;
    const [isLoading, setIsLoading] = useState(false);

    const refreshLesson = () => {
        socket.emit('fetch_lesson', shortId);
    }

    return (
        <div className='main'>
            <Button className='m-1 align-self-center' variant='secondary' size='sm' onClick={() => navigate('/teacher')} >
                &#60; Back to Lessons
            </Button>

            <Row className='alert alert-info'>
                <Col md='4'>
                    <h6 className='text-muted'>Learning Objective:</h6>
                    <h4>{learningObjective}</h4>
                </Col>
                <Col><h5>Subject: <strong>{subject}</strong><br />Class: <strong>{classCode}</strong></h5></Col>
                <Col md='4'>
                    <h5 className='alert alert-secondary'>
                        Class code: &#160;
                        <Button size='sm' variant='secondary' onClick={() => navigator.clipboard.writeText(`${shortId}`)}>{shortId}</Button>
                    </h5>
                </Col>
            </Row>
            <Button type='button' className='mb-2' size='sm' variant='secondary' onClick={refreshLesson}>Refresh Lesson Data</Button>
            <AskQuestion isLoading={isLoading} setIsLoading={setIsLoading} shortId={shortId} _id={_id} />
            <Questions isLoading={isLoading} setIsLoading={setIsLoading} lesson={lesson} />
        </div >
    )
}

export default Lesson;