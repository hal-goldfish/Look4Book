import { HStack, Spacer, Text } from "@chakra-ui/react";
import React, { useState } from "react";

type HeaderProps = {
    title: String;
    userName: String;
};

export const Header = ({
    title,
    userName,
}: HeaderProps) => {
    const [curTime, setCurTime] = useState<Date>(new Date());
    setInterval(()=>{setCurTime(new Date())}, 30*1000);
    return (
        <HStack w="100%" h="10vh" bgColor='rgba(200,200,200,0.8)' px='10%'>
            <Text fontSize='18px' fontWeight="bold">
                {curTime.toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"})}
            </Text>
            <Spacer/>
            <Text fontSize='18px'>{title}</Text>
            <Spacer/>
            <Text fontSize='18px'>{userName}</Text>
        </HStack>
    );
};