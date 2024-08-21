import React from "react";
import {UserProfile as UserProfileTemplate } from "../components/template/UserProfile";
import { RouteProtecter } from "../components/RouteProtecter";
import { Header } from "../components/orgnism/Header";
import { Box, HStack } from "@chakra-ui/react";
import { SideMenu } from "../components/orgnism/SideMenu";
import { menuListWhenSignIn } from "../consts/SideMenu";

export const UserProfile = () => {
    return (
        <>
            <Header subText='プロフィール'/>
            <HStack alignItems='flex-start'>
                <SideMenu menuList={menuListWhenSignIn}/>
                <Box w='100%' h='90vh' overflow='auto'>
                    <RouteProtecter component={<UserProfileTemplate/>} allowedRoles={['admin','manager','user']}/>
                </Box>
            </HStack>
        </>
    );
};

export default UserProfile;