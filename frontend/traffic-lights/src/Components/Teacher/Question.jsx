import React from 'react';

const Question = ({ question }) => {

    return (
        <div className='m-1 p-2 bg-dark text-light'>
            {question}
        </div>
    )
}

export default Question;