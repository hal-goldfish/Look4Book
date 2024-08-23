import axios from "axios";
import { GET_BOOKS, GET_USER } from "../consts/API";
import { Book } from "../types/Book";

export async function getBooks(userId: number): Promise<Book[]>{
    let apiIsSuccess = true ;
    const res = await axios.get(GET_BOOKS, {
        params: {
            user_id: userId
        }
    }).catch(() => {
        apiIsSuccess = false ;
    });
    console.log(res.data);
    if(res.data['is_success']) apiIsSuccess = false;
    if(apiIsSuccess){
        return res.data.map(book => {
            return {
                id: book['id'],
                isbn: book['ISBN'],
                title: book['title'],
                author: book['author'],
                publisher: book['publisher'],
            } ;
        })
    }else{
        return [];
    }
};