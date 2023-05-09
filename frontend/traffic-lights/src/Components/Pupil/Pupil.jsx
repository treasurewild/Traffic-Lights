import Questions from './Questions.jsx';
import { useState } from 'react';
import { socket } from '../../socket';
import { Button, Modal, Row, Col } from 'react-bootstrap';

const Pupil = ({ lesson, provideResponse }) => {
    const { questions, shortId, _id, learningObjective, subject, classCode } = lesson;

    // Keeps a record of pupil responses to questions as Key-Value pairs.
    const [answered, setAnswered] = useState({});
    const [isClicked, setIsClicked] = useState(false);

    const refreshLesson = () => {
        socket.emit('fetch_lesson', shortId);
    }

    const sendResponse = (event) => {
        event.preventDefault();

        setIsClicked(true);

        setAnswered({
            ...answered,
            [provideResponse._id]: event.target.value
        })

        setTimeout(() => {
            setIsClicked(false)
        }, 10000);

        socket.emit('pupil_response', { response: event.target.value, questionId: provideResponse._id, lessonId: _id });
    }

    return (
        <div className='main'>
            <h2>Pupil Page</h2>
            <Row className='alert alert-info'>
                <Col md='4'>
                    <h6 className='text-muted'>Learning Objective:</h6>
                    <h4>{learningObjective}</h4>
                </Col>
                <Col><h5>Subject: <strong>{subject}</strong><br />Class: <strong>{classCode}</strong><br />Code: <strong>{shortId}</strong></h5></Col>
            </Row>

            <Button type='button' size='sm' variant='secondary' onClick={refreshLesson}>Refresh Lesson Data</Button>
            <Questions questions={questions} answered={answered} />

            <Modal
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
                </Modal.Body>
                <Modal.Footer className='mx-auto'>
                    <Button className='m-1' variant='success' size='lg' value='1green' onClick={isClicked ? null : sendResponse} disabled={isClicked} >Green</Button>
                    <Button className='m-1' variant='warning' size='lg' value='2amber' onClick={isClicked ? null : sendResponse} disabled={isClicked} >Amber</Button>
                    <Button className='m-1' variant='danger' size='lg' value='3red' onClick={isClicked ? null : sendResponse} disabled={isClicked} >Red</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Pupil