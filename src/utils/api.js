import axios from "axios"; // Importing Axios for handling HTTP requests
// import { api_endpoint } from "../hooks/apiHooks"; // Importing the base API endpoint from custom hooks
import {useAuth} from "./../context/AuthContext";

let refresh = false; // A boolean flag to prevent simultaneous refresh attempts

export const base_url =  "http://127.0.0.1:8000/api/"; // "https://cityoflightglobalchurch.org/backend/api/" // "https://clgcchurch-backend-production.up.railway.app/api/";

// Create an Axios instance with a predefined base URL
const api = axios.create({
    baseURL: base_url //'https://clgcchurch-backend-production.up.railway.app/api', // Backend API base URL (update as needed)
});

/*
 * REQUEST INTERCEPTOR
 * The request interceptor is executed before every request is sent.
 * It retrieves the access token stored in localStorage and attaches it to the Authorization header of the request.
 * This ensures that all requests to the API are authenticated.
 */
api.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token"); // Access token stored in local storage
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`; // Add the access token to the Authorization header
    }
    return config; // Pass the modified config object to the next step
  },
  (error) => Promise.reject(error) // Handle any errors that occur while processing the request
);

/*
 * RESPONSE INTERCEPTOR
 * The response interceptor is executed after a response is received.
 * If a 401 Unauthorized error is encountered, the interceptor attempts to refresh the access token using the stored refresh token.
 * The refreshed tokens are then stored in localStorage, and the failed request is retried with the new access token.
 */
api.interceptors.response.use(
  (resp) => resp, // Pass the response as-is if there are no errors
  async (error) => {
    // Check if the response status is 401 Unauthorized and ensure no ongoing refresh attempt
    if (error.response.status === 401 && !refresh) {
      refresh = true; // Set the refresh flag to true to avoid multiple refresh attempts
      const {logout} = useAuth();

      try {
        const response = await axios.post(
          `${base_url}auth/refresh/`, // The endpoint for refreshing tokens
          {
            refresh: localStorage.getItem("refresh_token"), // Use the refresh token stored in localStorage
          },
          {
            headers: {
              "Content-Type": "application/json", // Specify the content type for the request
            },
          },
          { withCredentials: true } // Include credentials (cookies) in the request
        );
        // If the token refresh is successful, update localStorage and retry the original request
        if (response.status === 200) {
          api.defaults.headers.common["Authorization"] = `Bearer ${response.data["access"]}`; // Update the Axios instance with the new access token
          localStorage.setItem("access_token", response.data.access); // Save the new access token
          localStorage.setItem("refresh_token", response.data.refresh); // Save the new refresh token
          return axios(error.config); // Retry the original failed request
        }
      } catch (error) {
        // force logout and redirect to login page
        await logout()
      }
      
      
      
    }
    refresh = false; // Reset the refresh flag after handling the error
    return error; // Pass the error object to the next step
  }
);

export default api; // Export the configured Axios instance
