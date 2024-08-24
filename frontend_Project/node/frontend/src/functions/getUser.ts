import axios from "axios";
import { User } from "../types/User";
import { GET_USER } from "../consts/API";

export async function getUser(userId: number): Promise<User | null> {
    let apiIsSuccess = true;
    const res: any = await axios.get(GET_USER,{
        params:{
            user_id: userId
        }
    }).catch(()=>{
        apiIsSuccess = false;
    });
    if(apiIsSuccess){
        return {
            id: userId,
            name: String(res.data['name']),
            role: res.data['role'],
            bookCount: Number(res.data['book_count']),
            stateCount: String(res.data['state_count']).split(' ').map(value => Number(value)),
            categoryCount: String(res.data['categories_count']).split(' ').map(value => Number(value)),
        };
    }else{
        return null;
    }
}