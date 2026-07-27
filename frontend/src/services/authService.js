import axios from "axios";


const API_URL = "http://localhost:8080/auth";


export const loginUser = (data) => {

    return axios.post(
        `${API_URL}/login`,
        data
    );

};


export const registerUser = (data) => {

    return axios.post(
        `${API_URL}/register`,
        data
    );

};