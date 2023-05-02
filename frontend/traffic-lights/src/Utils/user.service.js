import axios from "axios";
import authHeader from './auth-header';

const getPupilBoard = () => {
    return axios.get(`${process.env.REACT_APP_URL}/roles/pupil`, { headers: authHeader() });
}

const getTeacherBoard = () => {
    return axios.get(`${process.env.REACT_APP_URL}/roles/teacher`, { headers: authHeader() });
}

const getPublicContent = () => {
    return axios.get(`${process.env.REACT_APP_URL}/roles/all`, { headers: authHeader() });
}


const userService = {
    getPublicContent,
    getPupilBoard,
    getTeacherBoard
};

export default userService;