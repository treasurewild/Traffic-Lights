import React, { useState } from 'react';
import { socket } from '../../socket.js';
import { Button, Form } from 'react-bootstrap';
import QuestionModel from '../../Utils/QuestionModel.js';
import spinner from '../../Assets/Spinner.svg';

const AskQuestion = ({ _id, shortId }) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState('');

    const askQuestion = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setCurrentQuestion(text);

        const question = new QuestionModel(text);

        // Asks question and allows time for responses before fetching lesson data.
        socket.timeout(10000).emit('ask_question', { _id: _id, question: question }, () => {
            setIsLoading(false);
            setCurrentQuestion('');
            socket.emit('fetch_lesson', shortId);
        });

        setText('');
    }

    return (
        <>
            <Form onSubmit={askQuestion}>
                <Form.Control
                    type="text"
                    value={text}
                    onChange={e => setText(e.target.value)} />
                <Button className='m-1 btn-success' type="submit" disabled={isLoading}>Ask New Question</Button>
            </Form>
            {isLoading &&
                <>
                    <p className='text-muted'><img src={spinner} className='rotate' alt="spinner" width="20" height="20" /> Waiting for responses to: {currentQuestion}</p>
                </>
            }
        </>
    );
};

export default AskQuestion;