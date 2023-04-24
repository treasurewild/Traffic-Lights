import React, { useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

const Question = ({ key, question }) => {

    const [radioValue, setRadioValue] = useState('1');

    return (
        <>
            <div className='m-1 p-2 bg-dark text-light'>
                <h5 className='p-2'>{question.text}</h5>

                <ButtonGroup>
                    <ToggleButton
                        id='green'
                        type="radio"
                        variant='outline-success'
                        name="radio"
                        value='1'
                        checked={radioValue === '1'}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        Green
                    </ToggleButton>
                    <ToggleButton
                        id='amber'
                        type="radio"
                        variant='outline-warning'
                        name="radio"
                        value='2'
                        checked={radioValue === '2'}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        Amber
                    </ToggleButton>
                    <ToggleButton
                        id='red'
                        type="radio"
                        variant='outline-danger'
                        name="radio"
                        value='3'
                        checked={radioValue === '3'}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        Red
                    </ToggleButton>
                </ButtonGroup>
            </div>
        </>
    )
}

export default Question;