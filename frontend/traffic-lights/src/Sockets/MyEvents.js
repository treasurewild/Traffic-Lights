import React from 'react'

const MyEvents = ({ questions }) => {

    const displayQuestions = () => {
        const display = questions.map((question, index) => {
            return (
                <h4 key={index}>
                    {index + 1}: {question}
                </h4>
            )
        });
        return display;
    }

    return (
        <>
            <h3>Questions</h3>
            {displayQuestions()}
        </>
    )
}

export default MyEvents;