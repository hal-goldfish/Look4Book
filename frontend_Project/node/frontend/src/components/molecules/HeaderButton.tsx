import { Text, Button, Box } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

type HeaderButtonProps = {
    text: String;
    variant?: string;
    onClick: ()=>void;
    icon?: ReactNode;
    curPage: string;
}

export const HeaderButton = ({
    text,
    variant='ghost',
    onClick,
    icon,
    curPage,
}: HeaderButtonProps) => {
    const cur = curPage===text;
    const color = cur ? 'blue' : 'black';
    return (
        <Box>
            <Button variant={variant} onClick={onClick} color={color} isDisabled={cur}>
                {icon? icon: null}
                <Text fontSize='x-large' ml='5%'>{text}</Text>
            </Button>
        </Box>
    );
};

export default HeaderButton;