import axios from 'axios';
import authHeader from '../Utils/auth.header.js';

export const getLesson = async lessonId => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/teacher/lesson/${lessonId}`);
        if (res.data && res.status)
            return { lesson: res.data, status: res.status };
    }
    catch (err) {
        return {
            lesson: {},
            status: err.response?.status ?? 204
        }
    }
}

export const getLessonPupil = async lessonId => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/pupil/${lessonId}`);
        if (res.data && res.status)
            return { lesson: res.data, status: res.status };
    }
    catch (err) {
        return {
            lesson: {},
            status: err.response?.status ?? 204
        }
    }
}

export const getLessons = async () => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/teacher/lessons`, { headers: authHeader() });
        return { lessons: res.data, status: res.status };
    }
    catch (err) {
        return {
            lessons: [],
            status: err.response?.status ?? 204
        }
    }
}

export const newLesson = async lesson => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL}/teacher/new-lesson`, lesson);
        if (res.data)
            return { lesson: res.data.lesson, status: res.status };
        return { message: 'There was a problem' }
    }
    catch (err) {
        return {
            status: err.response?.status ?? 204
        }
    }
}

export const deleteLesson = async id => {
    try {
        const res = await axios.put(`${process.env.REACT_APP_URL}/teacher/delete-lesson`, { lessonId: id }, { headers: authHeader() });
        return { status: res.status }
    }
    catch (err) {
        return {
            status: err.response?.status ?? 204
        }
    }
}