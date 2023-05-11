import { useState } from 'react';
import { socket } from '../../../socket.js';
import { Button, FloatingLabel, Form, ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import spinner from '../../../Assets/Spinner.svg';

const AskQuestion = ({ timer, setTimer, isLoading, setIsLoading, _id, shortId }) => {
    const [text, setText] = useState('');
    const [currentQuestion, setCurrentQuestion] = useState('');

    const askQuestion = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setCurrentQuestion(text);

        // Asks question and allows time for responses before fetching lesson data.

        socket.timeout(timer).emit('ask_question', { _id: _id, question: text, timer: timer }, () => {
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
                        autocomplete="off"
                        type="text"
                        placeholder='Ask a Question'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        required
                    />
                </FloatingLabel>
                <ButtonGroup  >
                    <Button variant='success' type="submit" disabled={isLoading}>Ask New Question</Button>
                    <DropdownButton variant='secondary' as={ButtonGroup} title={`Time to answer: ${timer / 1000} seconds`} id="bg-nested-dropdown" disabled={isLoading}>
                        <Dropdown.Item onClick={() => setTimer(5000)}>5 Seconds</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTimer(10000)}>10 Seconds</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTimer(20000)}>20 Seconds</Dropdown.Item>
                        <Dropdown.Item onClick={() => setTimer(30000)}>30 Seconds</Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
            </Form>
            {isLoading && currentQuestion &&
                <>
                    <p className='text-muted'><img src={spinner} className='rotate' alt="spinner" width="20" height="20" /> Waiting for responses to: {currentQuestion}</p>
                </>
            }
        </>
    );
};

export default AskQuestion;