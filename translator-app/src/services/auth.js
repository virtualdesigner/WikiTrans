import axios from "axios";
import { getBackendUrl } from "../utils/common";

const API_URL = getBackendUrl();

export const login = async ({ username, password }) => {
  const res = await axios.post(API_URL + 'auth/token/', {username, password});

  if (res.data.access) {
    axios.defaults.headers.common = {'Authorization': `Bearer ${res.data.access}`}
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

export const getUserAuthTokens = () => localStorage.getItem('user');

export const isLoggedIn = () => {
    const authData = getUserAuthTokens();
    if (typeof authData === 'string' && authData.length > 0) {
        try {
            if (typeof JSON.parse(authData).access === 'string') return true;
        } catch (e) {
            console.error('Error with parsing user auth tokens: ', e);
            return false;
        }
    }
    return false;
}

export const logout = () => {
    localStorage.removeItem("user");
    window.location.assign('/');
};