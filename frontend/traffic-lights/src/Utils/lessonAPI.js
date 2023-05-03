import axios from 'axios';


export const getLesson = async lessonId => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/teacher/lesson/${lessonId}`);
        if (res.data && res.status)
            return { lesson: res.data, status: res.status };
        return { message: 'This lesson does not exist' };
    }
    catch (err) {
        return {
            lesson: {},
            status: err.response?.status ?? 204
        }
    }
}

export const getLessons = async teacherId => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/teacher/lessons/${teacherId}`);
        if (res.data && res.status)
            return { lessons: res.data, status: res.status };
        return { message: 'This lesson does not exist' };
    }
    catch (err) {
        return {
            lessons: [],
            status: err.response?.status ?? 204
        }
    }
}

export const newLesson = async data => {
    try {
        const res = await axios.post(`${process.env.REACT_APP_URL}/teacher/new-lesson`, data);
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

export const deleteLesson = async data => {
    try {
        const res = await axios.delete(`${process.env.REACT_APP_URL}/teacher/delete-lesson`, { data: data });
        if (res.status === 200) {
            return { status: res.status }
        }
        return { message: 'There was a problem' }
    }
    catch (err) {
        return {
            status: err.response?.status ?? 204
        }
    }
}