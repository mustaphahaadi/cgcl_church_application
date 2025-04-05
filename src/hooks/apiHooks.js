import axios from "axios";

export const api_endpoint = "http://127.0.0.1:8000/api/";
const ACCESS_TOKEN = localStorage.getItem("access_token") == null ? "":localStorage.getItem("access_token")

const header = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${ACCESS_TOKEN}`,
};

// Auth endpoint
export const loginApi = (username, password) => {
  const api = axios.post(
    `${api_endpoint}auth/login/`,{ username, password }
    );
  return api;
};

export const registerApi = (data) => {
  const api = axios.post(`${api_endpoint}auth/register/`, data);
  return api;
};

export const refreshTokenApi = (refresh_token) => {
  const api = axios.post(
    `${api_endpoint}auth/refresh/`,{ refresh_token },
    {
      headers: header,
    }
  );
  return api;
};

export const logoutApi = (refresh) => {
  const api = axios.post(
    `${api_endpoint}auth/logout/`,{ refresh },
    {
      headers: header,
    }
  );
  return api;
};


// Profile Endpoints
export const getProfileApi = () => {
    const api = axios.get(
      `${api_endpoint}profiles/`,
      {
        headers: header,
      }
    );
    return api;
  };
  
export const createProfile = (data) =>{

  const api = axios.post(
    `${api_endpoint}profiles/`,
    {
      headers: header,
    }
  );
  console.log(header)
  return api;
};