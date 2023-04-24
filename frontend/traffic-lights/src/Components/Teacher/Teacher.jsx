import React from 'react';
import ConnectionManager from '../../Sockets/ConnectionManager';
import Questions from './Questions.jsx';
import AskQuestion from './AskQuestion';

const Teacher = ({ questions }) => {

    const questionss = [
        {
            text: 'Test 1',
            _id: '123',
            responses: [
                '3red', '2amber', '1green'
            ]
        },
        {
            text: 'Test 2',
            _id: '456',
            responses: [
                '1green', '2amber', '1green'
            ]
        }
    ]

    return (
        <>
            <h2>Teacher Page</h2>
            <ConnectionManager />
            <AskQuestion />
            <Questions questions={questionss} />
        </>
    )
}

export default Teacher