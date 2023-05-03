import axios from "axios";

export const signIn = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/users/signin`, {
            email,
            password,
        });

        const { data } = response;
        if (data.accessToken) {
            localStorage.setItem(`user`, JSON.stringify(data)); // Is it a good idea to put this in local storage?
        }
        return data;
    }
    catch (error) {
        return { error: error.response.data.message };
    }
};

export const register = async (handle, name, email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_URL}/users/register`, {
            handle,
            name,
            email,
            password
        });

        return { data: response.data, status: response.status };
    }
    catch (error) {
        return { error: error.response.data.message }
    }
}