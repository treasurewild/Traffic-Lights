import React from 'react';
import ConnectionManager from '../../Sockets/ConnectionManager';
import ConnectionState from '../../Sockets/ConnectionState';
import { socket } from '../../socket';
import { Button } from 'react-bootstrap';
import Questions from './Questions.jsx';
import AskQuestion from './AskQuestion';

const Teacher = ({ isConnected, lesson }) => {

    const { _id, questions, shortId } = lesson;

    const refreshLesson = () => {
        socket.emit('fetch_lesson', shortId);
    }

    return (
        <div className='main'>
            <h2>Teacher Page</h2>
            <Button type='button' size='sm' variant='secondary' onClick={refreshLesson}>Refresh Lesson Data</Button>
            <ConnectionState isConnected={isConnected} shortId={shortId} />
            <ConnectionManager />
            <AskQuestion shortId={shortId} _id={_id} />
            <Questions questions={questions} />
        </div>
    )
}

export default Teacher;