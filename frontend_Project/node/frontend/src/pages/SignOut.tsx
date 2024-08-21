import React from "react";
import { Header } from "../components/orgnism/Header";
import { SignOut as SignOutTemplate } from './../components/template/SignOut';
import { Box, HStack } from "@chakra-ui/react";
import { SideMenu } from "../components/orgnism/SideMenu";
import { menuListWhenSignIn } from "../consts/SideMenu";

export const SignOut = () => {
    return (
        <>
            <Header subText='サインアウト'/>
            <HStack alignItems='flex-start'>
                <SideMenu menuList={menuListWhenSignIn}/>
                <Box width='100%'>
                    <SignOutTemplate></SignOutTemplate>
                </Box>
            </HStack>
        </>
    );
};

export default SignOut;
