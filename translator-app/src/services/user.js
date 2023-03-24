import axios from "axios";
import { getBackendUrl } from "../utils/common";
import { getUserAuthTokens } from "./auth";

const API_URL = getBackendUrl();

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