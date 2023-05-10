import Responses from './Responses';
import { Button } from 'react-bootstrap';
import { socket } from '../../../socket';
import spinner from '../../../Assets/Spinner.svg';

const Question = ({ timer, isLoading, setIsLoading, lesson, question }) => {
    const { _id, shortId } = lesson;

    const { text, responses } = question;

    const deleteQuestion = () => {
        socket.emit('delete_question', { lessonId: _id, questionId: question._id });
    }

    const askQuestion = (event) => {
        event.preventDefault();
        setIsLoading(true);

        // Asks question and allows time for responses before fetching lesson data.
        socket.timeout(timer).emit('refresh_question', { shortId: shortId, questionId: question._id, lessonId: _id, timer: timer }, () => {
            setIsLoading(false);
            socket.emit('fetch_lesson', shortId);
        });
    }

    const showResponses = () => {
        const display = responses.map((data, index) => {
            return (
                <div key={index}>
                    <Responses lessonId={_id} questionId={question._id} data={data} />
                </div>
            )
        })
        return display;
    }

    return (
        <div className='alert alert-dark'>
            <h4>{text}</h4>
            <hr className='break' />
            <div className='mb-2'>
                {showResponses()}
            </div>

            <Button className='align-self-center' variant='secondary' size='sm' onClick={askQuestion} disabled={isLoading}>
                {isLoading ?
                    <>
                        <img src={spinner} className='rotate' alt="spinner" width="20" height="20" />
                    </>
                    :
                    'Ask Again'
                }
            </Button>
            <Button className='align-self-center' variant='danger' size='sm' onClick={deleteQuestion}>
                Delete
            </Button>
        </div>
    )
}

export default Question;