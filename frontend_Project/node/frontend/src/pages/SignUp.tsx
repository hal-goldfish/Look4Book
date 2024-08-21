import React from "react";
import {SignUp as SignUpTemplate } from "../components/template/SignUp";
import { Header } from "../components/orgnism/Header";

export const SignUp = () => {
    return (
        <>
            <Header subText='サインアップ' />
            <SignUpTemplate></SignUpTemplate>
        </>
    );
};

export default SignUp;