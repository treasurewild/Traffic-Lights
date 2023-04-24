import React from 'react';
import ConnectionManager from '../../Sockets/ConnectionManager';
import Questions from './Questions.jsx';
import AskQuestion from './AskQuestion';

const Teacher = ({ questions }) => {
    return (
        <>
            <h2>Teacher Page</h2>
            <ConnectionManager />
            <AskQuestion />
            <Questions questions={questions} />
        </>
    )
}

export default Teacher