import { instanceAccount } from "./axios";

export const accountApi={
    getAccountInfo:async()=>{
        return instanceAccount.get('');
    },
    getFavoriteMovies:async(accountId,params)=>{
        return instanceAccount.get(`/${accountId}/favorite/movies`,{ params:params});
    },
    getFavoriteTV:async(accountId,params)=>{
        return instanceAccount.get(`/${accountId}/favorite/tv`,{ params:params});
    },
    postToFavorite:async(accountId,body)=>{
        try{
            const response=await instanceAccount.post('/'+accountId+'/favorite',body);
            if(response){
                return response.data
            }
        }catch(err){
            throw err
        }
    }
}