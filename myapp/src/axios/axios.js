import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // RESPONSE INTERCEPTOR
// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await API.post("/api/auth/refresh");

//         const newAccessToken = refreshResponse.data.accessToken;

//         localStorage.setItem("accessToken", newAccessToken);

//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return API(originalRequest);
//       } catch (err) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         localStorage.removeItem("user");
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default API;
