
import ProvideResponse from './ProvideResponse.jsx';
import Questions from './Questions.jsx';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../../socket';
import { Button, Row, Col } from 'react-bootstrap';

const Pupil = ({ lesson, provideResponse }) => {
    const navigate = useNavigate();

    const { questions, shortId, _id, learningObjective, subject, classCode } = lesson;

    // Keeps a record of pupil responses to questions as Key-Value pairs.
    const [answered, setAnswered] = useState({});
    // const [isClicked, setIsClicked] = useState(false);

    const refreshLesson = () => {
        socket.emit('fetch_lesson', shortId);
    }

    // const sendResponse = (event) => {
    //     event.preventDefault();

    //     setIsClicked(true);

    //     setAnswered({
    //         ...answered,
    //         [provideResponse.questionId]: event.target.value
    //     })

    //     setTimeout(() => {
    //         setIsClicked(false)
    //     }, provideResponse.timer);

    //     socket.emit('pupil_response', { response: event.target.value, questionId: provideResponse.questionId, lessonId: _id });
    // }

    useEffect(() => {
        // Redirects to homepage if no lesson data available
        if (!lesson._id) {
            navigate('/');
            return;
        }
    }, [lesson._id, navigate])

    return (
        <div className='main'>
            <Row className='alert alert-info'>
                <Col md='8'>
                    <h6 className='text-muted'>Learning Objective:</h6>
                    <h4>{learningObjective}</h4>
                </Col>
                <Col><h5>Subject: <strong>{subject}</strong><br />Class: <strong>{classCode}</strong><br />Code: <strong>{shortId}</strong></h5></Col>
            </Row>

            <Button type='button' size='sm' variant='secondary' onClick={refreshLesson}>Refresh Lesson Data</Button>
            <Questions questions={questions} answered={answered} />
            {provideResponse.show && <ProvideResponse provideResponse={provideResponse} answered={answered} setAnswered={setAnswered} lessonId={_id} />}
            {/* <Modal
                show={provideResponse.show}
                backdrop="static"
                keyboard={false} // Prevents ability to close modal by pressing Esc
                size='lg'
                centered
            >
                <Modal.Header>
                    <Modal.Title>Provide a Response</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>{provideResponse.text}</h3>
                    {isClicked && <span className='text-muted'>Thank you for your response.</span>}
                </Modal.Body>
                <Modal.Footer className='mx-auto'>
                    <Button className='m-1' variant='success' size='lg' value='1green' onClick={isClicked ? null : sendResponse} disabled={isClicked} >Green</Button>
                    <Button className='m-1' variant='warning' size='lg' value='2amber' onClick={isClicked ? null : sendResponse} disabled={isClicked} >Amber</Button>
                    <Button className='m-1' variant='danger' size='lg' value='3red' onClick={isClicked ? null : sendResponse} disabled={isClicked} >Red</Button>
                </Modal.Footer>
            </Modal> */}

        </div>
    )
}

export default Pupil