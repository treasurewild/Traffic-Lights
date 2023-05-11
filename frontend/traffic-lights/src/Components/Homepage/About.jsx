import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const About = () => {

    const [show, setShow] = useState(false);

    return (
        <div>
            <h1>Welcome to Traffic Lights</h1>
            <div className='alert alert-danger'>
                <h4>How to Use Traffic Lights</h4>
                <p>Traffic Lights is a simple tool for class feedback when teaching remotely.</p>
                <p>Teachers ask questions and get Green-Amber-Red feedback from the class to gauge progress and understanding. This knowledge allows them guide their lesson and differentiate tasks, and it also informs future learning.</p>
                <p>Teachers can save lesson data for reference, and even create templates to reuse for future lessons.</p>
                <Button size='sm' variant='secondary' onClick={() => setShow(!show)}>{show ? 'Hide' : 'Read More'}</Button>
                {show &&
                    <div className='mt-2 alert alert-light'>
                        <h5>Suggestions</h5>
                        <p>
                            There are lots of different ways you can use Traffic Lights for feedback. The most important thing is habit formation, both for the teacher and the pupils. Like many tools it's more effective if it forms a key part of your Assessment for Learning. A good way to embed this is to use it for both low and high-level questions.
                        </p>
                        <p>Here are a few ideas:</p>
                        <ul>
                            <li>Get an idea of how the class scored on self-marked work.</li>
                            <li>Show agreement or disagreement about statements.</li>
                            <li>Vote on future topics.</li>
                            <li>Allow a choice of tasks and see how many students are working on each one.</li>
                            <li>Ask the same question at different points in the lesson to see progress (the app allows you to reuse questions and stores responses together).</li>
                            <li>Break a task down into steps and get class feedback on each step.</li>
                        </ul>
                    </div>
                }
            </div>

        </div >
    )
}

export default About