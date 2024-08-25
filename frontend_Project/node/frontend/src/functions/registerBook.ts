import axios from "axios";
import { GET_BOOK_REGISTER } from "../consts/API";

export async function registerBook(userId: number, ISBN: string): Promise<number>{
    let apiIsSuccess = true;
    const res: any = await axios.get(GET_BOOK_REGISTER, {
        params: {
            user_id: userId,
            ISBN: ISBN,
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).catch(()=>{
        apiIsSuccess = false;
    });
    if(apiIsSuccess && res.data['is_success']) apiIsSuccess = res.data['is_success']==='true';
    if(apiIsSuccess){
        return res.data['book_id'];
    }else{
        return -1;
    }
}