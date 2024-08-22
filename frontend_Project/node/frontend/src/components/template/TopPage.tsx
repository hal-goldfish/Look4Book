import { VStack, Heading, Text, HStack, Box, Image } from "@chakra-ui/react";
import React from "react";

export const TopPage = () => {
    return (
        <Box bgImage='./images/topPageBG.jpg' bgSize='cover' h='100vh' overflow='hidden'>
            <VStack>
                <HStack w='100%' spacing='24px' pr='24px' py='8px' bgColor='lightgreen' justify='right'>
                    <Text fontSize='x-large'>sign up</Text>
                    <Text fontSize='x-large'>login</Text>
                </HStack>
                <Box display='flex' justifyContent='left' w='100%' ml='80px' mt='64px'>
                    <Heading><Text px='16px' bgColor='lightblue' fontSize='xxx-large' color='teal'>Look4Book</Text></Heading>
                </Box>
                <Box display='flex' justifyContent='center' w='100%' mr='25%'>
                    <Text bgColor='aquamarine' fontSize='x-large'>本の森で、暮らすということ</Text>
                </Box>
            </VStack>
        </Box>
    );
};