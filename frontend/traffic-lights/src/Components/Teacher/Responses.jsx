import React from 'react'

const Responses = ({ responses }) => {

    const displayResponses = () => {
        // Sort responses to display Red-Amber-Green
        responses?.sort();

        const display = responses?.map((response, index) => {
            if (response === '3red')
                return <div key={index} className='bg-danger bar'></div>;

            if (response === '2amber')
                return <div key={index} className='bg-warning bar'></div>;

            if (response === '1green')
                return <div key={index} className='bg-success bar'></div>;

            return <div key='na'></div>
        });
        return display?.length > 0 ? display : <p className='text-muted'>No responses yet.</p>;
    }

    return (
        <div className='d-flex flex-row flex-wrap'>
            {displayResponses()}
        </div>
    )
}

export default Responses;