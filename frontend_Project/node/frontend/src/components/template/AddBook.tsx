import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";

const AddBook = () => {
    return(
        <Text>本を追加する</Text>
    );
}

export const AddBookTemplate = () => {
    return (
        <VStack bgImage={commonBG} bgSize='cover' bgRepeat='no-repeat' h='100vh' overflow='hidden'>
            <Header curPage='本棚'/>
            <Flex w='100%' h='90vh' alignItems='center' justify='center'>
                <Box alignItems='center' w='90%' maxW='90%' h='90%' bgColor='rgba(255,255,255,0.5)' p='8px' overflow='auto'>
                    <AddBook/>
                </Box>
            </Flex>
        </VStack>
    );
};

export default AddBookTemplate;