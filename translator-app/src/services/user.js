import axios from "axios";
import { getUserAuthTokens } from "./auth";

// for dev
// const API_URL = "http://localhost:8000/wiki-trans/";

// for prod
const API_URL = "https://deepak.pythonanywhere.com/wiki-trans/";

export const getAnnotators = async (project) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access}`}
    return (await axios.get(API_URL + 'users/list/', project)).data;
};

export const isManager = () => {
    const userData = getUserAuthTokens();
    if (userData) {
        const userGroups = JSON.parse(userData).groups;
        if (userGroups && userGroups.includes('Manager')) return true;
    }
    return false;
}