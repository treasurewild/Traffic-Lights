import React from 'react';
import { Button } from 'react-bootstrap';
import { socket } from '../../socket';

const Question = ({ question, answered, setAnswered }) => {

    const index = answered.map(e => e.shortId).indexOf(question.shortId);

    const sendResponse = (event) => {
        setAnswered([
            ...answered,
            { shortId: question.shortId, response: event.target.value }
        ])
        socket.emit('pupil_response', { response: event.target.value, shortId: question.shortId });
    }

    const displayResponse = () => {

        if (answered[index].response === '1green')
            return <Button type='button' variant='success' active>Green</Button>
        if (answered[index].response === '2amber')
            return <Button type='button' variant='warning' active>Amber</Button>
        if (answered[index].response === '3red')
            return <Button type='button' variant='danger' active>Red</Button>
    }

    const resetResponse = (e) => {
        socket.emit('pupil_response_reset', { response: answered[index].response, shortId: question.shortId });

        const copy = [...answered];
        copy.splice(answered[index], 1);
        setAnswered(copy);
    }

    return (
        <div className='m-1 p-2 bg-dark text-light'>
            <h5 className='p-2'>{question.text} </h5>
            {index === -1 ?
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