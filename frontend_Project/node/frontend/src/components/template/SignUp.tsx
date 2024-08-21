import axios from "axios";
import React, { useState } from "react";
import { POST_SIGNUP } from "../../consts/API";
import { useRouter } from "next/router";
import { login } from "../../functions/login";
import { useAuthUserContext } from "../../providers/AuthUser";

export const SignUp = () => {
    const router = useRouter();
    const {signin} = useAuthUserContext();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const handleSignUp = () => {
        setErrorMessage(null);
        axios.post(POST_SIGNUP,{
            name: userName,
            password: password,
            password_confirmation: passwordConfirmation,
        }).then(async () => {
            const res = await login(userName, password);
            if(res.isSuccess && res.user && res.token){
                signin(res.user, res.token, ()=>{
                    router.push('/UserProfile');
                })
            }else{
                setErrorMessage('サインアップ出来ましたがサインインに失敗しました。');
            }
        }).catch(()=>{
            setErrorMessage('サインアップに失敗しました');
        })
    };
    return (
        <div>
            <p>サインアップページです</p>
            <p><a href="/">トップに戻る</a></p>
            <input type='text' value={userName} placeholder='ユーザーネーム' onChange={(e)=>setUserName(e.target.value)}></input>
            <input type='password' value={password} placeholder='パスワード' onChange={(e)=>setPassword(e.target.value)}></input>
            <input type='password' value={passwordConfirmation} placeholder='パスワード確認' onChange={(e)=>setPasswordConfirmation(e.target.value)}></input>
            <button onClick={handleSignUp} disabled={userName.length === 0 || password.length === 0 || password !== passwordConfirmation}>サインアップ</button>
            {errorMessage ? <p>{errorMessage}</p> : null}
        </div>
    )
};

export default SignUp;