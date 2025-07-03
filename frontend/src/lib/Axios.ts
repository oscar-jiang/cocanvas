import axios, {type AxiosInstance} from "axios";

export const axiosInstance : AxiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true // this is how you send cookies with every request
})