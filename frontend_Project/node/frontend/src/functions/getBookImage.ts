import axios from "axios";
import { GET_BOOK_IMAGE_BY_ISBN } from "../consts/API";
import { imageNotFound } from "../consts/IMAGE";

export async function getBookImage(ISBN: String) {
    let apiIsSuccess = true;
    const res = await axios.get(GET_BOOK_IMAGE_BY_ISBN, {
        params: {
            ISBN: ISBN,
        },
        responseType: 'blob',
    }).catch(() => {
        apiIsSuccess = false;
    });
    if(apiIsSuccess){
        return [URL.createObjectURL(res.data)];
    }else{
        return imageNotFound;
    }
};