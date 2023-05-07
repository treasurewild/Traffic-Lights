import Questions from './Questions.jsx';
import { useState } from 'react';
import { socket } from '../../socket';
import { Button, Modal } from 'react-bootstrap';

const Pupil = ({ provideResponse, lesson }) => {
    const { questions, shortId } = lesson;

    const refreshLesson = () => {
        socket.emit('fetch_lesson', shortId);
    }

    const sendResponse = (event) => {
        socket.emit('pupil_response', { response: event.target.value, questionId: provideResponse._id });
    }


    return (
        <div className='main'>
            <h2>Pupil Page</h2>
            <Button type='button' size='sm' variant='secondary' onClick={refreshLesson}>Refresh Lesson Data</Button>
            <Questions questions={questions} />
            <Modal
                show={provideResponse.show}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Provide a Response</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {provideResponse.text}
                </Modal.Body>
                <Modal.Footer className='mx-auto'>
                    <Button className='m-1' variant='success' value='1green' onClick={sendResponse} >Green</Button>
                    <Button className='m-1' variant='warning' value='2amber' onClick={sendResponse} >Amber</Button>
                    <Button className='m-1' variant='danger' value='3red' onClick={sendResponse} >Red</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default Pupil