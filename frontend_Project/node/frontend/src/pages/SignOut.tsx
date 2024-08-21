import React from "react";
import { Header } from "../components/orgnism/Header";
import { SignOut as SignOutTemplate } from './../components/template/SignOut';

export const SignOut = () => {
    return (
        <>
            <Header subText='サインアウト'/>
            <SignOutTemplate></SignOutTemplate>
        </>
    );
};

export default SignOut;
