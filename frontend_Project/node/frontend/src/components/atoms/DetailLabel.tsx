import { Box, HStack, Flex, Text } from "@chakra-ui/react";
import React from "react";

type DetailLabelProps = {
    label: string;
    value: string;
    labelWidth?: string;
    valueWidth?: string;
}

export const DetailLabel = ({
    label,
    value,
    labelWidth='30%',
    valueWidth='70%'
}: DetailLabelProps) => {
    return (
        <Box w='100%'>
            <HStack spacing={1}>
                <Flex justifyItems='left' w={labelWidth}>
                    <Text fontSize='small' fontWeight='bold'>{label}</Text>
                </Flex>
                <Flex justifyItems='left' w={valueWidth}>
                    <Text fontSize='small'>{value}</Text>
                </Flex>
            </HStack>
        </Box>
    );
};

export default DetailLabel;