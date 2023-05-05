import { useState } from 'react';
import Responses from './Responses';
import QuestionModel from '../../../Utils/QuestionModel';
import { Button } from 'react-bootstrap';
import { socket } from '../../../socket';

const Question = ({ lesson, question }) => {
    const { _id, shortId } = lesson;

    const { text, responses } = question;
    const [loading, setIsLoading] = useState(false);

    const deleteQuestion = () => {
        socket.emit('delete_question', { lessonId: _id, questionId: question._id });
    }

    const askQuestion = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const refreshQuestion = new QuestionModel(question.text);

        // Asks question and allows time for responses before fetching lesson data.
        socket.timeout(10000).emit('ask_question', { _id: _id, question: refreshQuestion }, () => {
            setIsLoading(false);
            socket.emit('fetch_lesson', shortId);
        });
    }

    return (
        <div className='alert alert-success'>
            <div className='d-flex flex-row'>
                <h4 className='m-1 p-2'>{text}</h4>
            </div>
            <Responses responses={responses} />
            <Button className='align-self-center' variant='danger' size='sm' onClick={deleteQuestion}>
                Delete
            </Button>
            <Button className='align-self-center' variant='secondary' size='sm' onClick={askQuestion} disabled={loading}>
                {loading ? 'Fetching responses' : 'Ask Again'}
            </Button>
        </div>
    )
}

export default Question;