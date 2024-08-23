import React from "react";
import { SideMenuButton, SideMenuButtonProps } from "../molecules/SideMenuButton";
import { Box, VStack } from "@chakra-ui/react";

type SideMenuProps = {
    width?: string;
    menuList: SideMenuButtonProps[];
}

export const SideMenu = ({
    width='64px',
    menuList,
}: SideMenuProps) => {
    return (
        <Box width={width} height='90vh' bg='rgba(150,150,200,0.8)'>
            <VStack spacing='16px'>
                {menuList.map(menu => <SideMenuButton {...menu}/>)}
            </VStack>
        </Box>
    );
}