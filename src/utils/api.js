import axios from "axios";
import { api_endpoint } from "../hooks/apiHooks";
let refresh = false;

const api = axios.create({
    baseURL: 'https://clgcchurch-backend-production.up.railway.app/api', // Update with your Django backend URL
});
// const  
api.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const response = await axios.post(`${api_endpoint}auth/refresh/`,
        {
          refresh: localStorage.getItem("refresh_token"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data["access"]}`;
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);
        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);

export default api;