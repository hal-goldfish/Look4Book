import { HamburgerIcon } from "@chakra-ui/icons";
import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

type HeaderProps = {
    text?: String;
    subText: String;
};

export const Header = ({
    text='Look4Book',
    subText,
}: HeaderProps) => {
    return (
        <HStack
        top={0}
        width="100%"
        height="10vh"
        bg="lightgreen">
            <Text fontSize='24px' fontWeight="bold">{text}</Text>
            <Text fontSize='18px'> - {subText}</Text>
        </HStack>
    );
};