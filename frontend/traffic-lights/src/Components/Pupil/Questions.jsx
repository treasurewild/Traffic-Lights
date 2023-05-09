import React from 'react';
import Question from './Question.jsx';

const Questions = ({ questions, answered }) => {

    const displayQuestions = () => {
        if (questions?.length > 0) {
            const display = questions.map((question, index) => {
                return (
                    <div key={index}>
                        <Question question={question} answered={answered} />
                    </div>)
            });
            return display;
        }
        return <p className='text-muted'>No questions have been asked.</p>
    }

    return (
        <>
            <h3>Questions</h3>
            {displayQuestions()}
        </>
    )
}

export default Questions;