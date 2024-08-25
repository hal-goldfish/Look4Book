import axios from "axios";
import { GET_BOOK_BY_ISBN } from "../consts/API";
import { Book } from "../types/Book";
import { CATEGORIES } from './../consts/Categories';
import { getBookImage } from '../functions/getBookImage';

export async function getBookByISBN(userId: number, ISBN: string): Promise<Book|null>{
    let apiIsSuccess = true;
    const res: any = await axios.get(GET_BOOK_BY_ISBN, {
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
        const image = await getBookImage(res.data['ISBN']);
        return  {
                    id: res.data['_book_id'],
                    ISBN: res.data['ISBN'],
                    title: res.data['title'],
                    author: res.data['author'],
                    publisher: res.data['publisher'],
                    categoryId: res.data['category_id'],
                    categoryName: CATEGORIES.categories[res.data['category_id']],
                    image: image,
                };
    }else{
        return null;
    }
};