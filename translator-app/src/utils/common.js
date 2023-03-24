
const isLocalHost = () => window.location.hostname === 'localhost';

export const getBackendUrl = () => {
    if(isLocalHost()) return 'http://localhost:8000/wiki-trans/';
    return 'https://deepak.pythonanywhere.com/wiki-trans/';
}