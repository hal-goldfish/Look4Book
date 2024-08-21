import React, { useContext, useEffect, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { useRouter } from "next/router";
import { User } from "../../types/User";
import axios from "axios";
const API_BASE_URL = 'http://localhost:8000/api/';

export const SignIn = () => {
    const {signin} = useAuthUserContext();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState(false);
    const [userList, setUserList] = useState<String[]>(['']);
    const router = useRouter();

    const getUsers = async () => {
        console.log('getUser');
        const res = await axios.get(API_BASE_URL+'user');
        setUserList(res.data.map(user => new String(user['name'])));
        console.log(res.data);
    };

    useEffect(()=>{
        getUsers();
    },[]);
    const handleSignIn = () => {
        axios.post(API_BASE_URL+'login/', {
            name: userName,
            password: password,
        }).then(res => {
            setIsError(false);
            const token: String = res.data['token'];
            if(token.length > 0){
                // ログイン成功
                const user: User = {
                    id: res.data['id'],
                    name: res.data['name'],
                    role: 'user',
                }
                signin(user,token,()=>{
                    router.push('/UserProfile');
                });
            }
        }).catch(() => {
            setPassword('');
            setIsError(true);
        })
    };
    return (
        <div>
            <p>サインインページです</p>
            <p><a href="/SignUp">サインアップはこちら</a></p>
            {userList.map((user, id) => <p>{id}.{user}</p>)}
            <input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="ユーザーネーム"></input>
            <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password"></input>
            <button onClick={handleSignIn} disabled={userName.length===0 || password.length===0}>sign in</button>
            <p hidden={!isError}>サインインに失敗しました</p>
        </div>
    )
};

export default SignIn;