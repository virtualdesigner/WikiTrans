import axios from "axios";

// for dev
// const API_URL = "http://localhost:8000/wiki-trans/";

// for prod
const API_URL = "https://deepak.pythonanywhere.com/wiki-trans/";

export const listSentencesByProject = async (projectId) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access}`}
    return (await axios.get(API_URL + `projects/${projectId}/sentences/`)).data;
};

export const updateSentencesByProject = async (projectId, sentences) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access}`}
    return (await axios.put(API_URL + `projects/${projectId}/sentences/update/`, sentences)).data;
};