import axios from "axios";
import { POST_EDIT_BOOKS } from "../consts/API";

export async function editBook(userId: Number, bookId: Number, readingState: Number, isFavorite: Boolean){
    let apiIsSuccess = true;
    const res: any = await axios.post(POST_EDIT_BOOKS+'?user_id='+userId+'&book_id='+bookId, {
        state: readingState,
        favorite: isFavorite? 1: 0,
    }, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).catch(()=>{
        apiIsSuccess = false ;
    });
    if(apiIsSuccess && res.data['is_success']) apiIsSuccess = res.data['is_success']==='true' ;
    return apiIsSuccess;
};