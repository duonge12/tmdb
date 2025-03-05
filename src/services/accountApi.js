
import { instanceAccount } from "./axiosAccount";
const api_key=import.meta.env.VITE_API_KEY
const session_id=import.meta.env.VITE_SESSION_ID
export const accountApi={
    getAccountInfo:async()=>{
        return instanceAccount.get('',{params:{
            api_key: api_key,
            session_id:session_id
        }});
    },
    addToFavorite:async(accountId,body)=>{
        try{
            const response=await instanceAccount.post('/'+accountId+'/favorite',body,{params:{
                session_id:session_id
            }});
            if(response){
                return response.data
            }
        }catch(err){
            throw err
        }
    }
}