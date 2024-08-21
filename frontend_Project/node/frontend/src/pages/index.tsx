import { HStack } from "@chakra-ui/react";
import React from "react";
import { Header } from "../components/orgnism/Header";
import { SideMenu } from "../components/orgnism/SideMenu";
import { useAuthUserContext } from "../providers/AuthUser";
import { menuListWhenSignIn, menuListWhenSignOut } from "../consts/SideMenu";
import { TopPage as TopPageTemplate } from "../components/template/TopPage";

export const Top = () => {
    const {isLogin} = useAuthUserContext();
    return (
        <>
            <Header subText='トップ'/>
            <HStack alignItems='flex-start'>
                <SideMenu  menuList={isLogin? menuListWhenSignIn: menuListWhenSignOut}/>
                <TopPageTemplate/>
            </HStack>
        </>
    );
};

export default Top;