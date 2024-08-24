import axios from "axios";
import { GET_HAS_BOOK } from "../consts/API";

export async function isAlreadyRegistered(userId: number, bookId: number): Promise<boolean>{
    let apiIsSuccess = true;
    const res: any = await axios.get(GET_HAS_BOOK, {
        params: {
            user_id: userId,
            book_id: bookId,
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    }).catch(()=>{
        apiIsSuccess = false;
    });
    if(apiIsSuccess && res.data['is_success']) apiIsSuccess = res.data['is_success']==='true';
    if(apiIsSuccess){
        return res.data['is_having'] === 'true';
    }else{
        return false;
    }
}