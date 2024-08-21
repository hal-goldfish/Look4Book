import React from "react";
import { SignIn as SignInTemplate } from "../components/template/SignIn";
import { Header } from "../components/orgnism/Header";

export const SignIn = () => {
    return (
        <>
            <Header subText='サインイン'/>
            <SignInTemplate></SignInTemplate>
        </>
    );
};

export default SignIn;