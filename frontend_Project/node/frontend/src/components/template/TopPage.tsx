import { VStack, Heading, Text, HStack, Box, Image, Button, Flex, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { SIGN_IN, SIGN_UP } from "../../consts/PAGE";
import { topPageBG, topPageBook } from "../../consts/IMAGE";
import { Login, PersonAdd } from "@mui/icons-material";
import SignUpButton from "../orgnism/SignUpButton";
import LogInButton from "../orgnism/LogInButton";

export const TopPage = () => {
    const router = useRouter();
    const onClickSignup = () => {
        router.push(SIGN_UP);
    };
    const onClickLogin = () => {
        router.push(SIGN_IN);
    };
    return (
        <Box bgImage={topPageBG} bgSize='cover' h='100vh' overflow='hidden'>
            <VStack>
                <Box display='flex' justifyContent='center' ml='10%' mt='20vh'>
                    <HStack fontSize='xxx-large' fontWeight='bold'>
                        <Text fontSize='64px' color='orange'>L</Text>
                        <Text>ook </Text>
                        <Text fontSize='64px' color='green'>F</Text>
                        <Text>or </Text>
                        <Text fontSize='64px' color='blue'>B</Text>
                        <Text>ook</Text>
                    </HStack>
                </Box>
                <VStack ml='15%' mt='12px'>
                    <Text fontSize='x-large' as='u' fontWeight='bold'>本の森で生きる</Text>
                    <HStack fontSize='x-large' as='i' fontWeight='bold'>
                        <Text fontSize='xx-large' color='orange'>L</Text>
                        <Text>ife in a </Text>
                        <Text fontSize='xx-large' color='green'>F</Text>
                        <Text>orest of </Text>
                        <Text fontSize='xx-large' color='blue'>B</Text>
                        <Text>ooks</Text>
                    </HStack>
                </VStack>
                <Flex bgImage={topPageBook} bgSize='20vh auto' bgRepeat='no-repeat' h='15vh' w='20vh' ml='15%'>
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
        </Box>
    );
};