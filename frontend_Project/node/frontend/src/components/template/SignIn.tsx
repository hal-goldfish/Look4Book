import React, { useContext, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { useRouter } from "next/router";
import { User } from "../../types/User";

export const SignIn = () => {
    const {signin, signout} = useAuthUserContext();
    const [userName, setUserName] = useState<string>('');
    const router = useRouter();
    const handleSignIn = () => {
        const user: User = {
            id: 1,
            name: userName,
            role: 'user',
        }
        signin(user,"hogehogeToken",()=>{
            router.push('/UserProfile');
        })
    };
    return (
        <div>
            <p>サインインページです</p>
            <p><a href="/SignUp">サインアップはこちら</a></p>
            <input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="ユーザーネーム"></input>
            <button onClick={handleSignIn} disabled={userName.length===0}>sign in</button>
        </div>
    )
};

export default SignIn;