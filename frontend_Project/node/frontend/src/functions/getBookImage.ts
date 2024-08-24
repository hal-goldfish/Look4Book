import axios from "axios";
import { GET_BOOK_IMAGE_BY_ISBN } from "../consts/API";

export async function getBookImage(ISBN: String) {
    let apiIsSuccess = true;
    const res = axios.get(GET_BOOK_IMAGE_BY_ISBN, {
        params: {
            ISBN: ISBN,
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