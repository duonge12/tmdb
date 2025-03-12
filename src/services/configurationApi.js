import { instance } from "./axios";

export const configurationApi={
    getImageConfig:async()=>{
        return instance.get("/configuration");
    }
}