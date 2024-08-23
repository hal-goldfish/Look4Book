import { Text, Button, Box } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

type HeaderButtonProps = {
    text: String;
    variant?: String;
    onClick: ()=>void;
    icon?: ReactNode;
}

export const HeaderButton = ({
    text,
    variant='ghost',
    onClick,
    icon,
}: HeaderButtonProps) => {
    return (
        <Box>
            <Button variant={variant} onClick={onClick}>
                {icon? icon: null}
                <Text fontSize='x-large' ml='5%'>{text}</Text>
            </Button>
        </Box>
    );
};

export default HeaderButton;