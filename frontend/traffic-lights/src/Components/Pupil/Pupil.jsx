import React from 'react';
import ConnectionManager from '../../Sockets/ConnectionManager';
import Questions from './Questions.jsx';

const Pupil = ({ questions }) => {
    return (
        <>
            <h2>Pupil Page</h2>
            <ConnectionManager />
            <Questions questions={questions} />
        </>
    )
}

export default Pupil