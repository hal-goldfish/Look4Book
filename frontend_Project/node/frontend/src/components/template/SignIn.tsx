import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { useRouter } from "next/router";
import { User } from "../../types/User";
import axios from "axios";
import { GET_USER_LIST, POST_LOGIN } from "../../consts/API";
import { login } from "../../functions/login";

export const SignIn = () => {
    const {signin} = useAuthUserContext();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState(false);
    const [userList, setUserList] = useState<String[]>(['']);
    const router = useRouter();

    const getUsers = async () => {
        const res = await axios.get(GET_USER_LIST);
        setUserList(res.data.map((user) => new String(user['name'])));
    };

    useEffect(()=>{
        getUsers();
    },[]);
    const handleSignIn = async () => {
        const res = await login(userName, password);
        if(res.isSuccess && res.user && res.token){
            signin(res.user, res.token, ()=>{
                router.push('/UserProfile');
            })
        }else{
            setPassword('');
            setIsError(true);
        }
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