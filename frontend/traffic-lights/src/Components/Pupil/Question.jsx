import React from 'react';
import { Button } from 'react-bootstrap';

const Question = ({ question, answered }) => {
    const { text, _id } = question;

    const displayResponse = () => {
        // This feels like an inefficient way to solve this problem
        if (answered[_id] === '1green')
            return (
                <div className='alert alert-success'>
                    <h5 className='p-2'>{text} </h5>
                    <Button type='button' variant='success' active='true'>You responded Green</Button>
                </div>
            )
        if (answered[_id] === '2amber')
            return (
                <div className='alert alert-warning'>
                    <h5 className='p-2'>{text} </h5>
                    <Button type='button' variant='warning' active='true'>You responded Amber</Button>
                </div>
            )
        if (answered[_id] === '3red')
            return (
                <div className='alert alert-danger'>
                    <h5 className='p-2'>{text} </h5>
                    <Button type='button' variant='danger' active='true'>You responded Red</Button>
                </div>
            )
        return (
            <div className='alert alert-secondary'>
                <h5 className='p-2'>{text} </h5>
                <Button className='m-1' type='button' variant='secondary' >No response given</Button>
            </div>
        )
    }

    return (
        <>
            {displayResponse()}
        </>
    )
}

export default Question;