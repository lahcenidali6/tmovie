import axios from "axios"
const key = process.env.NEXT_PUBLIC_API_KEY
const baseUrl ="https://api.themoviedb.org/3/"
export const axiosInstance = axios.create({
    baseURL:baseUrl,
    params: {
    api_key: key,
  },
})