import axios from "axios";

const API_URL = "http://localhost:8000/wiki-trans/";

export const listSentencesByProject = async (projectId) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access}`}
    return (await axios.get(API_URL + `projects/${projectId}/sentences/`)).data;
};

export const updateSentencesByProject = async (projectId, sentences) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).access}`}
    return (await axios.put(API_URL + `projects/${projectId}/sentences/update/`, sentences)).data;
};