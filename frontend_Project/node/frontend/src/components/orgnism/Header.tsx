import { HStack, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import CurTime from "../molecules/CurTime";
import { useRouter } from "next/router";
import HeaderButton from "../molecules/HeaderButton";
import { LibraryAdd, LibraryBooks, Recommend } from "@mui/icons-material";
import { BOOKS, USER_PROFILE } from "../../consts/PAGE";
import UserButton from "../molecules/UserButton";
import { useAuthUserContext } from "../../providers/AuthUser";

type HeaderProps = {
    curPage: String;
};

export const Header = ({
    curPage,
}: HeaderProps) => {
    const router = useRouter();
    const {user} = useAuthUserContext();
    return (
        <HStack w="100%" h="10vh" bgColor='rgba(200,200,200,0.8)' px='10%'>
            <CurTime/>
            <Spacer/>
            <HeaderButton text='本の追加' onClick={()=>{}} icon={<LibraryAdd/>} />
            <Spacer/>
            <HeaderButton text='本棚' onClick={()=>{router.push(BOOKS);}} icon={<LibraryBooks/>} />
            <Spacer/>
            <HeaderButton text='本を探す' onClick={()=>{}} icon={<Recommend/>} />
            <Spacer/>
            <UserButton user={user} onClick={()=>{router.push(USER_PROFILE);}} />
        </HStack>
    );
};