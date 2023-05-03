import React from 'react';
import Responses from './Responses';
import trashCan from '../../../Assets/trash-can-solid.svg';
import { Button } from 'react-bootstrap';
import { socket } from '../../../socket';

const Question = ({ lessonId, question }) => {

    const { text, responses } = question;

    const deleteQuestion = () => {
        socket.emit('delete_question', { lessonId: lessonId, questionId: question._id });
    }

    return (
        <div className='m-1 p-2 bg-dark'>
            <div className='text-light d-flex flex-row justify-content-between'>
                <p className='m-1 p-2'>{text}</p>
                <Button className='align-self-center' variant='danger' size='sm' onClick={deleteQuestion}>
                    <img alt='delete_question' className='icon' src={trashCan} />
                </Button>
            </div>
            <Responses responses={responses} />
        </div>
    )
}

export default Question;