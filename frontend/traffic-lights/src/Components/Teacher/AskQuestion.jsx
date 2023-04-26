import React, { useState } from 'react';
import { socket } from '../../socket.js';
import { Button, Form } from 'react-bootstrap';
import QuestionModel from '../../Utils/QuestionModel.js';

const AskQuestion = ({ shortId }) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const askQuestion = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const question = new QuestionModel(text);

        // Asks question and allows time for responses before fetching lesson data.
        socket.timeout(10000).emit('ask_question', { question: question }, () => {
            setIsLoading(false);
            socket.emit('fetch_lesson', shortId);
        });

        setText('');
    }

    return (
        <Form onSubmit={askQuestion}>
            <Form.Control
                type="text"
                value={text}
                onChange={e => setText(e.target.value)} />
            <Button className='m-1 btn-success' type="submit" disabled={isLoading}>Ask New Question</Button>
        </Form>
    );
};

export default AskQuestion;