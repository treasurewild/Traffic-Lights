import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getLesson, deleteLesson } from '../../Utils/lessonAPI';

const LessonSummary = ({ lesson, setLesson, getLessonsHandler }) => {
    const { learningObjective, subject, level, shortId, _id, teacher } = lesson;

    const navigate = useNavigate();

    const chooseLesson = async (e) => {
        e.preventDefault();

        const res = await getLesson(_id);
        if (res.status === 200) {
            setLesson(res.lesson);
            navigate(`/teacher/lesson/${shortId}`);
        }
    }

    const deleteLessonHandler = async () => {
        const res = await deleteLesson(_id);

        if (res.status === 200)
            getLessonsHandler();
    }

    return (
        <>
            <Card className="m-1 lesson">
                <Card.Header>
                    {subject && <p>Subject: <strong>{subject}</strong></p>}
                    {level && <p>Level: <strong>{level}</strong></p>}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {learningObjective}
                    </Card.Text>
                    <Button variant='primary' size='sm' onClick={chooseLesson}>Go to Lesson</Button>
                    <Button variant='danger' size='sm' onClick={deleteLessonHandler}>Delete</Button>
                </Card.Body>
            </Card>
        </>
    )
}

export default LessonSummary