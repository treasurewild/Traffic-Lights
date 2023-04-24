import React from 'react'

const Responses = ({ responses }) => {

    const displayResponses = () => {
        const display = responses.map((response, index) => {
            if (response === '3red')
                return <div key={index} className='bg-danger bar'></div>;

            if (response === '2amber')
                return <div key={index} className='bg-warning bar'></div>;

            if (response === '1green')
                return <div key={index} className='bg-success bar'></div>;
        })

        return display;
    }

    return (
        <div className='d-flex flex-row flex-wrap'>
            {displayResponses()}
        </div>
    )
}

export default Responses;