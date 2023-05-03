import React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getLesson } from '../../Utils/lessonAPI';

const LessonSummary = ({ lesson, setLesson }) => {
    const { learningObjective, subject, level, shortId, _id } = lesson;

    const navigate = useNavigate();

    const chooseLesson = async (e) => {
        e.preventDefault();

        const res = await getLesson(_id);
        if (res.status === 200) {
            setLesson(res.lesson);
            navigate(`/teacher/lesson/${shortId}`);
        }
    }

    return (
        <>
            <Card className="m-1 lesson" type='button' onClick={chooseLesson} >
                <Card.Header><strong>{subject} {level}</strong></Card.Header>
                <Card.Body>
                    <Card.Text>
                        {learningObjective}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default LessonSummary