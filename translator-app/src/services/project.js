import axios from "axios";
import { getBackendUrl } from "../utils/common";

const API_URL = getBackendUrl();

export const createProject = async (project) => {
    console.log(JSON.parse(localStorage.getItem('user')).access);
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access}`}
    await axios.post(API_URL + 'projects/create/', project);
};

export const fetchProjects = async () => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access}`}
    return (await axios.get(API_URL + 'projects/list/')).data;
}
