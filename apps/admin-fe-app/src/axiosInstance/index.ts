import axios from "axios";

export const AttachmentURL = "http://localhost:8000";
export const axiosApiInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosApiInstancePublic = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//   async (config: any) => {
//     config.headers = {
//       Authorization: `Bearer ${TokenHandler.getToken()}`,
//       Accept: "application/json",
//     };
//     return config;
//   },
//   (error) => {
//     Promise.reject(error);
//   }
// );

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  return response;
});
