import React from "react";
import { SignIn as SignInTemplate } from "../components/template/SignIn";
import { Header } from "../components/orgnism/Header";
import { Box, HStack } from "@chakra-ui/react";
import { SideMenu } from "../components/orgnism/SideMenu";
import { menuListWhenSignOut } from "../consts/SideMenu";

export const SignIn = () => {
    return (
        <>
            <Header subText='サインイン'/>
            <HStack alignItems='flex-start'>
                <SideMenu menuList={menuListWhenSignOut}/>
                <Box width='100%'>
                    <SignInTemplate></SignInTemplate>
                </Box>
            </HStack>
        </>
    );
};

export default SignIn;