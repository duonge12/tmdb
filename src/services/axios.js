import axios from "axios";
export const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers:{
    Authorization:"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDFjNGNmZDBkZTA1ZGQ4MjdiZDE3OTFiODg3YmIwNiIsIm5iZiI6MTY2NjQ5NjY3My44MjgsInN1YiI6IjYzNTRiOGExMDkyOWY2MDA3Yzk5NmYzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K5R8yYtgTfe4ZV_pg2MTXnaLpklismvJLS9-N9ruSyk"
  }
});

