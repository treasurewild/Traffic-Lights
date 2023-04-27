import React from 'react';
import ConnectionManager from '../../Sockets/ConnectionManager';
import ConnectionState from '../../Sockets/ConnectionState';
import Questions from './Questions.jsx';

const Pupil = ({ isConnected, lesson }) => {
    const { questions, shortId } = lesson;

    return (
        <div className='main'>
            <h2>Pupil Page</h2>
            <ConnectionState isConnected={isConnected} shortId={shortId} />
            <ConnectionManager />
            <Questions questions={questions} />
        </div>
    )
}

export default Pupil