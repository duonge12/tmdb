import axios from "axios";
const instanceAccount = axios.create({
  baseURL: "https://api.themoviedb.org/3/account"
});
instanceAccount.interceptors.request.use(
  (config)=>{
    config.headers.Authorization=`Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`
    return config
  },
  (err)=>{
    return Promise.reject(err)
  }
)
export {instanceAccount}


