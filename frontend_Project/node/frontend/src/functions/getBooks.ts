import axios from "axios";
import { POST_BOOKS } from "../consts/API";
import { MyBook } from "../types/MyBook";
import { CATEGORIES } from "../consts/Categories";
import { STATES } from "../consts/States";

export async function getBooks(userId: Number): Promise<MyBook[]>{
    let apiIsSuccess = true ;
    console.log(userId);
    const res = await axios.post(POST_BOOKS, {
        user_id: userId,
    }, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).catch(() => {
        apiIsSuccess = false ;
    });
    if( apiIsSuccess && res.data['is_success']) apiIsSuccess = false;
    if(apiIsSuccess){
        return res.data.map(book => {
            const res: MyBook =  {
                userId: userId,
                bookId: book['id'],
                ISBN: book['ISBN'],
                title: book['title'],
                author: book['author'],
                publisher: book['publisher'],
                categoryId: book['category_id'],
                categoryName: CATEGORIES.categories[book['category_id']],
                stateId: book['state'],
                stateName: STATES.state[book['state']],
                favorite: Boolean(book['favorite']),
                registerDate: new Date(book['regist_date']),
            } ;
            return res ;
        })
    }else{
        return [];
    }
};