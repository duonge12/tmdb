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
            const params={session_id: localStorage.getItem('session_id')}
            const response=await instanceAccount.post('/'+accountId+'/favorite',body,{params:params});
            if(response){
                return response.data
            }
        }catch(err){
            throw err
        }
    }
}