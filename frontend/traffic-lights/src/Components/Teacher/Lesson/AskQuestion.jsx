import React, { useState } from 'react';
import { socket } from '../../../socket.js';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import QuestionModel from '../../../Utils/QuestionModel.js';
import spinner from '../../../Assets/Spinner.svg';

const AskQuestion = ({ _id, shortId }) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState('');
    const [timer, setTimer] = useState(10000);

    const askQuestion = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setCurrentQuestion(text);

        const question = new QuestionModel(text);

        // Asks question and allows time for responses before fetching lesson data.
        socket.timeout(timer).emit('ask_question', { _id: _id, question: question }, () => {
            setIsLoading(false);
            setCurrentQuestion('');
            socket.emit('fetch_lesson', shortId);
        });

        setText('');
    }

    return (
        <>
            <Form onSubmit={askQuestion}>
                <FloatingLabel controlId="ask-question" label="Question" className="mb-1">
                    <Form.Control
                        type="text"
                        placeholder='Ask a Question'
                        value={text}
                        onChange={e => setText(e.target.value)} />
                </FloatingLabel>
                <Button className='m-1 btn-success' type="submit" disabled={isLoading}>Ask New Question</Button>
                <Form.Label>Time to answer</Form.Label>
                <Form.Select size='sm' defaultValue='10' disabled={isLoading} onChange={(e) => setTimer(e.target.value * 1000)}>
                    <option value="5">5 seconds</option>
                    <option value="10">10 seconds</option>
                    <option value="20">20 seconds</option>
                </Form.Select>
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