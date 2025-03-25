import { get, ref } from "firebase/database";
import { db } from "./firebaseConfig";
export const firebaseApi={
    getClients:(id)=>{
        const refences=ref(db,'clients/'+id);
        const client= get(refences);
        return client
    }
}