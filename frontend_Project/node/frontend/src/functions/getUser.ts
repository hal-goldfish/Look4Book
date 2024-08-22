import axios from "axios";
import { User } from "../types/User";
import { GET_USER } from "../consts/API";

export async function getUser(userId: number): Promise<User | null> {
    let apiIsSuccess = true;
    const res = await axios.get(GET_USER+String(userId)+'/').catch(()=>{
        apiIsSuccess = false;
    });
    if(apiIsSuccess){
        return {
            id: userId,
            name: String(res.data['name']),
            role: String(res.data['role']),
        };
    }else{
        return null;
    }
}