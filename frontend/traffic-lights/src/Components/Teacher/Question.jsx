import React from 'react';
import Responses from './Responses';

const Question = ({ question }) => {

    const { text, responses } = question;

    return (
        <div className='m-1 p-2 bg-dark text-light'>
            <p>{text}</p>
            <Responses responses={responses} />
        </div>
    )
}

export default Question;