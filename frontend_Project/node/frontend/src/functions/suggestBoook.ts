import axios from "axios";
import { POST_BOOK_SUGGEST } from "../consts/API";
import { getBookImage } from "./getBookImage";
import { Book } from "../types/Book";
import { CATEGORIES } from "../consts/Categories";

export async function suggestBook(userId: Number, isCheckedCategories: boolean[]): Promise<{
    category: string,
    books: Book[],
}[]>{
    let apiIsSuccess = true;
    const categoryList: String[] = isCheckedCategories.map((value, idx) => {
        if(value){
            return String(idx);
        }else{
            return '';
        }
    }).filter(value=>value!='');
    const category_id = categoryList.length>0 ? categoryList.join(' ') : null;
    const res: any = await axios.post(POST_BOOK_SUGGEST, {
        user_id: userId,
        category_id: category_id,
    }, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).catch(() => {
        apiIsSuccess = false ;
    });
    if( apiIsSuccess && res.data['is_success']) apiIsSuccess = false;
    if(apiIsSuccess){
        const keys = Object.keys(res.data);
        const response = keys.map(async (category: any) => {
            const books = await Promise.all(res.data[category].map( async (book: any) => {
                const image = await getBookImage(book['ISBN']);
                const res: Book =  {
                    id: book['id'],
                    ISBN: book['ISBN'],
                    title: book['title'],
                    author: book['author'],
                    publisher: book['publisher'],
                    categoryId: book['category_id'],
                    categoryName: CATEGORIES.categories[book['category_id']],
                    image: image,
                };
                return res ;
            }));
            return {
                category: category,
                books: books,
            };
        });
        return await Promise.all(response);
    }else{
        return [];
    }
};