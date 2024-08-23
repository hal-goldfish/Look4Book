import axios from "axios";
import { GET_BOOK_IMAGE } from "../consts/API";

export async function getBookImage(bookId: Number) {
    let apiIsSuccess = true;
    const res = axios.get(GET_BOOK_IMAGE, {
        params: {
            book_id: bookId,
        }
    }).catch(() => {
        apiIsSuccess = false;
    });
    if(apiIsSuccess){
        return res.data;
    }else{
        return null;
    }
};