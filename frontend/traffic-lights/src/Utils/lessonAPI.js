import axios from 'axios';


export const getLesson = async lessonId => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_URL}/teacher`, lessonId)
        if (res.data && res.status)
            return { data: res.data, status: res.status };
        return { message: 'This lesson does not exist' };
    }
    catch (err) {
        return {
            data: {},
            status: err.response?.status ?? 204
        }
    }
}