import React from "react";
import {SignUp as SignUpTemplate } from "../components/template/SignUp";
import { Header } from "../components/orgnism/Header";
import { Box, HStack } from "@chakra-ui/react";
import { SideMenu } from "../components/orgnism/SideMenu";
import { menuListWhenSignOut } from "../consts/SideMenu";

export const SignUp = () => {
    return (
        <>
            <Header subText='サインアップ' />
            <HStack alignItems='flex-start'>
                <SideMenu menuList={menuListWhenSignOut}/>
                <Box width='100%'>
                    <SignUpTemplate></SignUpTemplate>
                </Box>
            </HStack>
        </>
    );
};

export default SignUp;