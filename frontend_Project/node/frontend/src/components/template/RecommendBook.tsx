import React from "react";
import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";

const RecommendBook = () => {
    return(
        <Text>本をおすすめする</Text>
    );
}

export const RecommendBookTemplate = () => {
    return (
        <VStack bgImage={commonBG} bgSize='cover' bgRepeat='no-repeat' h='100vh' overflow='hidden'>
            <Header curPage='本を追加' />
            <Flex w='100%' h='90vh' alignItems='center'>
                <VStack alignItems='center' w='100%' h='90%' bgColor='rgba(255,255,255,0.5)' p='8px' m='5%'>
                    <Box w='100%' h='100%' overflow='auto'>
                        <RecommendBook/>
                    </Box>
                </VStack>
            </Flex>
        </VStack>
    );
};

export default RecommendBookTemplate;