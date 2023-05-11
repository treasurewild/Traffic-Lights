import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { socket } from '../../socket';

const ProvideResponse = ({ provideResponse, answered, setAnswered, lessonId }) => {

    const [isClicked, setIsClicked] = useState(false)

    const sendResponse = (e) => {
        e.preventDefault();

        const response = e.target.value;

        setIsClicked(true);

        setAnswered({
            ...answered,
            [provideResponse.questionId]: response
        })

        setTimeout(() => {
            setIsClicked(false)
        }, provideResponse.timer);

        socket.emit('pupil_response', { response: response, questionId: provideResponse.questionId, lessonId });
    }
    return (
        <>
            <Modal
                show={!isClicked}
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
        </>
    )
}

export default ProvideResponse