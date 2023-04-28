import React from 'react';
import ConnectionManager from '../../Sockets/ConnectionManager';
import ConnectionState from '../../Sockets/ConnectionState';
import Questions from './Questions.jsx';
import { socket } from '../../socket';
import { Button } from 'react-bootstrap';

const Pupil = ({ isConnected, lesson }) => {
    const { questions, shortId } = lesson;

    const refreshLesson = () => {
        socket.emit('fetch_lesson', shortId);
    }

    return (
        <div className='main'>
            <h2>Pupil Page</h2>
            <Button type='button' size='sm' variant='secondary' onClick={refreshLesson}>Refresh Lesson Data</Button>
            <ConnectionState isConnected={isConnected} shortId={shortId} />
            {/* <ConnectionManager /> */}
            <Questions questions={questions} />
        </div>
    )
}

export default Pupil