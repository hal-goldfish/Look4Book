import React from "react";
import { Header } from "../components/orgnism/Header";
import { HStack, Box } from "@chakra-ui/react";
import { SideMenu } from "../components/orgnism/SideMenu";
import { RouteProtecter } from "../components/RouteProtecter";
import { menuListWhenSignIn } from "../consts/SideMenu";
import { Books as BooksTemplate } from "../components/template/Books";

export const Books = () => {
    return (
        <>
            <Header subText='プロフィール'/>
            <HStack alignItems='flex-start'>
                <SideMenu menuList={menuListWhenSignIn}/>
                <Box w='100%' h='90vh' overflow='auto'>
                    <RouteProtecter component={<BooksTemplate/>} allowedRoles={['admin','manager','user']}/>
                </Box>
            </HStack>
        </>
    );
}

export default Books;