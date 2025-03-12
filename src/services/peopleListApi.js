import { instance } from "./axios";

export const peopleListApi={
    getPopularPeopleList:async(params)=>{
        return instance.get("/person/popular",{ params:params});
    }, 
}