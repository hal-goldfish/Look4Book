import { VStack, Text, HStack, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { topPageBG, topPageBook } from "../../consts/IMAGE";
import SignUpButton from "../orgnism/SignUpButton";
import LogInButton from "../orgnism/LogInButton";

export const TopPage = () => {
    return (
        <Flex justify='center' align='center' bgImage={topPageBG} bgSize='cover' filter='sepia(20%)' h='100vh' overflow='hidden'>
            <VStack bgColor='rgba(200,200,200,0.5)' boxSize='450px'>
                <Box display='flex' justifyContent='center'mt='10%'>
                    <HStack fontSize='xxx-large' fontWeight='bold'>
                        <Text fontSize='64px' color='yellow'>L</Text>
                        <Text>ook </Text>
                        <Text fontSize='64px' color='green'>F</Text>
                        <Text>or </Text>
                        <Text fontSize='64px' color='blue'>B</Text>
                        <Text>ook</Text>
                    </HStack>
                </Box>
                <VStack mt='5%'>
                    <Text fontSize='x-large' as='u' fontWeight='bold'>本の森で生きる</Text>
                    <HStack fontSize='x-large' as='i' fontWeight='bold'>
                        <Text fontSize='xx-large' color='yellow'>L</Text>
                        <Text>ife in a </Text>
                        <Text fontSize='xx-large' color='green'>F</Text>
                        <Text>orest of </Text>
                        <Text fontSize='xx-large' color='blue'>B</Text>
                        <Text>ooks</Text>
                    </HStack>
                </VStack>
                <Flex bgImage={topPageBook} bgSize='20vh auto' bgRepeat='no-repeat' h='15vh' w='20vh' mt='10%'>
                    <HStack w='100%' justify='center'>
                        <Flex justify='center' w='40%'>
                            <SignUpButton/>
                        </Flex>
                        <Flex justify='center' w='40%'>
                            <LogInButton/>
                        </Flex>
                    </HStack>
                </Flex>
            </VStack>
        </Flex>
    );
};