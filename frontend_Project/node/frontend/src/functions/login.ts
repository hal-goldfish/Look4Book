import axios from "axios";
import router from "next/router";
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
            role: 'user',
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