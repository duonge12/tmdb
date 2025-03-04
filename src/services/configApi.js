import { instance } from "./axios";

export const configApi={
    getImageConfig:async()=>{
        return instance.get("/configuration");
    }
}