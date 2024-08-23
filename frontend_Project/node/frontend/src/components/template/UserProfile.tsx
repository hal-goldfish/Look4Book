import React from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";

const UserProfile = () => {
    const { user } = useAuthUserContext();
    return (
        <VStack>
            <HStack>
                <Text>ユーザー名</Text>
                <Text>{user?.name}</Text>
            </HStack>
            <HStack>
                <Text>ランク</Text>
                <Text>{user?.role}</Text>
            </HStack>
        </VStack>
    );
}

export const UserProfileTemplate = () => {
    return (
        <VStack bgImage={commonBG} bgSize='cover' bgRepeat='no-repeat' h='100vh' overflow='hidden'>
            <Header curPage='プロフィール' />
            <Flex w='100%' h='90vh' alignItems='center'>
                <VStack alignItems='center' w='100%' h='90%' bgColor='rgba(255,255,255,0.5)' p='8px' m='5%'>
                    <Box w='100%' h='100%' overflow='auto'>
                        <UserProfile/>
                    </Box>
                </VStack>
            </Flex>
        </VStack>
    );
};

export default UserProfileTemplate;