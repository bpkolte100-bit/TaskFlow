import axios from "axios";


const API_URL = "http://localhost:8080/api/tasks";



// Get logged-in user email

const getUserHeader = () => {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    if (!user) {
        console.error("No logged-in user found.");
        return {};
    }

    return {
        userEmail: user.email
    };

};





export const getTasks = () => {

    return axios.get(
        API_URL,
        {
            headers: getUserHeader()
        }
    );

};





export const createTask = (task) => {

    return axios.post(
        API_URL,
        task,
        {
            headers: getUserHeader()
        }
    );

};





export const updateTask = (id, task) => {

    return axios.put(
        `${API_URL}/${id}`,
        task,
        {
            headers: getUserHeader()
        }
    );

};





export const deleteTask = (id) => {

    return axios.delete(
        `${API_URL}/${id}`,
        {
            headers: getUserHeader()
        }
    );

};