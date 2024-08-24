import { useRadio, Box, Button, Text } from "@chakra-ui/react";
import React from "react";

type RadioCardProps = {
    label: String;
    onClick: ()=>void;
    isSelected: Boolean;
};

export const RadioCard = ({
    label,
    onClick,
    isSelected,
}: RadioCardProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        onClick();
    };
    return (
        <Button size='sm' onClick={(e)=>{handleClick(e)}} colorScheme={isSelected? 'blue': 'red'}>
            <Text fontSize='x-small'>{label}</Text>
        </Button>
    );
};

export default RadioCard;