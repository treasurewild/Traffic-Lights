import React from 'react';
import ConnectionManager from '../../Sockets/ConnectionManager';
import ConnectionState from '../../Sockets/ConnectionState';
// import { getLesson } from '../../Utils/lessonAPI';
// import { Button } from 'react-bootstrap';
import Questions from './Questions.jsx';
import AskQuestion from './AskQuestion';

const Teacher = ({ isConnected, lesson, setLesson }) => {

    const { questions, shortId } = lesson;

    // const refreshLesson = async () => {
    //     const res = await getLesson(shortId);
    //     setLesson(res.data);
    // }

    return (
        <div className='main'>
            <h2>Teacher Page</h2>
            {/* <Button type='button' variant='secondary' onClick={refreshLesson}>Refresh Lesson Data</Button> */}
            <ConnectionState isConnected={isConnected} shortId={shortId} />
            <ConnectionManager />
            <AskQuestion shortId={shortId} />
            <Questions questions={questions} />
        </div>
    )
}

export default Teacher;