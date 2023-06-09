import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { newLesson } from '../../Utils/lessonAPI';
import { Form, Button, FloatingLabel, Modal } from "react-bootstrap";
import LessonModel from "../../Utils/LessonModel";

const NewLesson = ({ show, setShow, lessons, setLessons, setLesson }) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const navigate = useNavigate();

    const [lessonData, setLessonData] = useState({
        learningObjective: '',
        classCode: '',
        level: '',
        subject: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setLessonData({
            ...lessonData,
            [name]: value
        });
    };

    const createLessonHandler = async (e) => {
        e.preventDefault();
        const { learningObjective, classCode, level, subject } = lessonData;
        const res = await newLesson(new LessonModel(learningObjective, classCode, level, subject, user.id));

        if (res.status === 200) {
            setLesson(res.lesson);
            setLessons([
                ...lessons,
                res.lesson
            ]);
            navigate(`/teacher/lesson/${res.lesson.shortId}`);
        }
    }

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        New Lesson
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={createLessonHandler}>
                        <Form.Group className="mb-3" >
                            <FloatingLabel controlId="name" label="Learning Objective" className="mb-1" >
                                <Form.Control type='text' name='learningObjective' placeholder='Learning Objective' value={lessonData.learningObjective} onChange={handleChange} />
                            </FloatingLabel>
                            <FloatingLabel controlId="class" label="Class" className="mb-1">
                                <Form.Control type='text' name='classCode' placeholder='Class' value={lessonData.classCode} onChange={handleChange} />
                            </FloatingLabel>
                            <FloatingLabel controlId="subject" label="Subject" className="mb-1">
                                <Form.Control type='text' name='subject' placeholder='Subject' value={lessonData.subject} onChange={handleChange} />
                            </FloatingLabel>
                            <FloatingLabel controlId="level" label="Level" className="mb-1">
                                <Form.Control type='text' name='level' placeholder='Level' value={lessonData.level} onChange={handleChange} />
                            </FloatingLabel>
                            <Button type='submit' size='lg' variant='success' >Create New Lesson</Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal >
        </>
    )
}

export default NewLesson