import React, { useState } from 'react';
import { socket } from '../../socket.js';
import { Button, Form } from 'react-bootstrap';
import QuestionModel from '../../Utils/QuestionModel.js';

const AskQuestion = () => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const question = new QuestionModel(text);

        socket.timeout(5000).emit('ask_question', question, () => {
            setIsLoading(false);
        });

        setText('');
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Control
                type="text"
                value={text}
                onChange={e => setText(e.target.value)} />
            <Button className='m-1 btn-success' type="submit" disabled={isLoading}>Ask New Question</Button>
        </Form>
    );
};

export default AskQuestion;