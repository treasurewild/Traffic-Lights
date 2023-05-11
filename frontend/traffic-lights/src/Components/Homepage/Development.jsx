import React from 'react'

const Development = () => {

    return (
        <div className='alert alert-secondary'>
            <p >Traffic Lights is a demo App created by Wil Treasure.</p>
            <p><strong>Please don't add sensitive personal information!</strong></p>
            <p>It's created using the following technologies: ReactJS, Mongoose, Express, Node, Short-Unique-ID, and Socket.io.
                <br />It uses Bootstrap and React Bootstrap for styling.</p>
            <h5>Where next?</h5>
            <p>The initial concept for this app seemed quite simple, but once I got stuck in I realised how many directions it could go, and how many other tools could be added to increase it's functionality. I've probably reached the end of that in terms of the learning payoff at this point, but here are some features that would make it much more useful:</p>
            <ul>
                <li>Exporting data as .xls</li>
                <li>Importing schemes of work. Even better if it can recognise the columns to populate lessons.</li>
                <li>A suggested question bank.</li>
                <li>The ability to share other resources like photos as part of the questions.</li>
            </ul>
        </div>
    )
}

export default Development