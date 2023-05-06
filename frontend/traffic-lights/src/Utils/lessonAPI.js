import axios from 'axios';


// export const getLesson = async lessonId => {
//     try {
//         const res = await axios.get(`${process.env.REACT_APP_URL}/teacher/lesson/${lessonId}`);
//         if (res.data && res.status)
//             return { lesson: res.data, status: res.status };
//     }
//     catch (err) {
//         return {
//             lesson: {},
//             status: err.response?.status ?? 204
//         }
//     }
// }

export const getLessons = async teacherId => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/teacher/lessons/${teacherId}`);
        if (res.data && res.status)
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
        const res = await axios.delete(`${process.env.REACT_APP_URL}/teacher/delete-lesson/${id}`);
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