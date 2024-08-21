import React, { useContext } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import router from "next/router";

export const UserProfile = () => {
    const { user , signout} = useAuthUserContext();
    const handleSignOut = () => {
        signout(()=>router.push('/'));
    };
    return (
        <>
            <p>ユーザープロフィール</p>
            <p>ユーザーネーム：{user?.name}</p>
            <p><a href="/">トップに戻る</a></p>
            <button onClick={handleSignOut}>sign out</button>
        </>
    )
};

export default UserProfile;