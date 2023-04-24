import React, { useState } from 'react';
import { socket } from '../socket';
import { Button, Form } from 'react-bootstrap';

const MyForm = () => {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        socket.timeout(5000).emit('ask_question', value, () => {
            setIsLoading(false);
        });
    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Control onChange={e => setValue(e.target.value)} />

            <Button className='m-1 btn-success' type="submit" disabled={isLoading}>Submit</Button>
        </Form>
    );
}

export default MyForm;