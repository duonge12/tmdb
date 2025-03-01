import axios from "axios";
export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers:{
    Authorization:`Bearer ${import.meta.env.DB_API_READ_ACCESS_TOKEN}`
  }
});

