import axios from "axios";
const api_key=import.meta.env.VITE_API_KEY
const session_id=import.meta.env.VITE_SESSION_ID
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

instance.interceptors.request.use(
  (config)=>{
    config.headers.Authorization=`Bearer ${import.meta.env.VITE_API_READ_ACCESS_TOKEN}`
    return config
  },
  (err)=>{
    return Promise.reject(err)
  }
)

const instanceAccount = axios.create({
  baseURL: "https://api.themoviedb.org/3/account"
});
instanceAccount.interceptors.request.use(
  (config)=>{
    config.params={...config.params,
      api_key:api_key,
      session_id:session_id
    }
    return config
  },
  (err)=>{
    return Promise.reject(err)
  }
)
export {instance,instanceAccount}


