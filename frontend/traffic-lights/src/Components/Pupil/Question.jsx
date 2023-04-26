import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { socket } from '../../socket';

const Question = ({ question }) => {
    const [response, setResponse] = useState('');

    const sendResponse = (event) => {
        setResponse(event.target.value);
        socket.emit('pupil_response', { response: event.target.value, shortId: question.shortId });
    }

    const displayResponse = () => {
        if (response === '1green')
            return <Button type='button' variant='success'>Green</Button>
        if (response === '2amber')
            return <Button type='button' variant='warning'>Amber</Button>
        if (response === '3red')
            return <Button type='button' variant='danger'>Red</Button>
    }

    const resetResponse = () => {
        socket.emit('pupil_response_reset', { response: response, shortId: question.shortId });
        setResponse('');
    }

    return (
        <div className='m-1 p-2 bg-dark text-light'>
            <h5 className='p-2'>{question.text} </h5>
            {response == '' ?
                <>
                    <Button className='m-1' variant='success' value='1green' onClick={sendResponse} >Green</Button>
                    <Button className='m-1' variant='warning' value='2amber' onClick={sendResponse} >Amber</Button>
                    <Button className='m-1' variant='danger' value='3red' onClick={sendResponse} >Red</Button>
                </>
                :
                <>
                    {displayResponse()}
                    <Button className='m-1' variant='secondary' onClick={resetResponse} >Reset</Button>
                </>
            }
        </div >
    )
}

export default Question;