import React from 'react';
import Question from './Question.jsx';

const Questions = ({ questions }) => {

    const displayQuestions = () => {
        console.log(questions)
        const display = questions.map((question, index) => {
            return <Question key={index} question={question} />
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

export default Questions;