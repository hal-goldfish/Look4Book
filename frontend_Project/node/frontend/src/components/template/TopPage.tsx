import { VStack, Heading, Text, HStack, Box, Image, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { SIGN_IN, SIGN_UP } from "../../consts/PAGE";

export const TopPage = () => {
    const router = useRouter();
    const onClickSignup = () => {
        router.push(SIGN_UP);
    };
    const onClickLogin = () => {
        router.push(SIGN_IN);
    };
    return (
        <Box bgImage='./images/topPageBG.jpg' bgSize='cover' h='100vh' overflow='hidden'>
            <VStack>
                <HStack w='100%' spacing='24px' pr='24px' py='8px' bgColor='lightgreen' justify='right'>
                    <Button variant='link' colorScheme="teal" onClick={onClickSignup}>
                        <Text fontSize='x-large'>sign up</Text>
                    </Button>
                    <Button variant='link' colorScheme="teal" onClick={onClickLogin}>
                        <Text fontSize='x-large'>log in</Text>
                    </Button>
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