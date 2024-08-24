import axios from "axios";
import { POST_LOGIN } from "../consts/API";
import { User } from "../types/User";

export async function login(userName: string, password: string): Promise<{
    isSuccess: boolean;
    user?: User;
    token?: string;
}>{
    let apiIsSuccess = true;
    const res = await axios.post(POST_LOGIN, {
        name: userName,
        password: password,
    }).catch(() => {
        apiIsSuccess = false;
    });
    if(!apiIsSuccess){
        return {
            isSuccess: false,
        };
    }
    const token: string = res.data['token'];
    if(token.length > 0){
        // ログイン成功
        const user: User = {
            id: res.data['id'],
            name: res.data['name'],
            role: res.data['role'],
            bookCount: Number(res.data['book_count']),
            stateCount: String(res.data['state_count']).split(' ').map(value => Number(value)),
            categoryCount: String(res.data['categories_count']).split(' ').map(value => Number(value)),
        }
        return {
            isSuccess: true,
            user: user,
            token: token,
        };
    }else{
        return {
            isSuccess: false,
        }
    }
};