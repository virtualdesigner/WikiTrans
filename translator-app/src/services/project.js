import axios from "axios";

// for dev
// const API_URL = "http://localhost:8000/wiki-trans/";

// for prod
const API_URL = "https://deepak.pythonanywhere.com/wiki-trans/";

export const createProject = async (project) => {
    console.log(JSON.parse(localStorage.getItem('user')).access);
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access}`}
    await axios.post(API_URL + 'projects/create/', project);
};

export const fetchProjects = async () => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access}`}
    return (await axios.get(API_URL + 'projects/list/')).data;
}
