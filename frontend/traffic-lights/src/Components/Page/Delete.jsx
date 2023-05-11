import { Modal, Button } from "react-bootstrap";
import { socket } from "../../socket";
import { useState } from "react";

const Delete = ({ lessonId, questionId, responsesId }) => {
    const [isClicked, setIsClicked] = useState(false);

    const submitHandler = () => {
        if (responsesId) {
            socket.emit(`delete_responses`, { lessonId: lessonId, questionId: questionId, responsesId: responsesId });
            return;
        }

        if (questionId) {
            socket.emit(`delete_question`, { lessonId: lessonId, questionId: questionId });
            return;
        }

        if (lessonId) {
            socket.emit(`delete_lesson`, { lessonId: lessonId });
            return;
        }

    }

    return (
        <>
            {
                isClicked
                    ?
                    <>
                        <Modal
                            show='true'
                            //backdrop="static"
                            size='lg'
                            centered
                            close='true'
                        >
                            <Modal.Header>
                                <Modal.Title>Are you sure?</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer className='mx-auto'>
                                <Button className='m-1' variant='secondary' size='lg' onClick={() => setIsClicked(false)} >Cancel</Button>
                                <Button className='m-1' variant='danger' size='lg' onClick={submitHandler} >Delete</Button>
                            </Modal.Footer>
                        </Modal >
                    </>
                    :
                    <Button className='m-1 align-self-center' size='sm' variant='outline-danger' onClick={() => setIsClicked(true)}>Delete</Button>}


        </>)
};

export default Delete