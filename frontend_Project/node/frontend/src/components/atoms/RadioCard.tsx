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
    return (
        <Button size='sm' onClick={onClick} colorScheme={isSelected? 'blue': 'red'}>
            <Text fontSize='x-small'>{label}</Text>
        </Button>
    );
};

export default RadioCard;