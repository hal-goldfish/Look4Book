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
                <HStack w='100%' spacing='24px' pr='24px' py='8px' justify='right'>
                    <Button variant='ghost' color="black" onClick={onClickSignup} bgColor='rgba(200,0,0,0.5)'>
                        <Text fontSize='x-large'>sign up</Text>
                    </Button>
                    <Button variant='ghost' color="black" onClick={onClickLogin} bgColor='rgba(200,0,0,0.5)'>
                        <Text fontSize='x-large'>log in</Text>
                    </Button>
                </HStack>
                <Box display='flex' justifyContent='left' w='100%' ml='80px' mt='64px'>
                    <Heading>
                        <Text px='16px' bgColor='rgba(200,0,0,0.5)' fontSize='xxx-large' color='black'>Look4Book</Text>
                    </Heading>
                </Box>
                <Box display='flex' justifyContent='center' w='100%' mr='25%'>
                    <Text bgColor='rgba(200,0,0,0.5)' fontSize='x-large' color='black'>本の森で、暮らすということ</Text>
                </Box>
            </VStack>
        </Box>
    );
};