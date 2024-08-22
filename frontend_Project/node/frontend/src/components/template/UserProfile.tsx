import React from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { menuListWhenSignIn } from "../../consts/SideMenu";
import { Header } from "../orgnism/Header";
import { SideMenu } from "../orgnism/SideMenu";
import { commonBG } from "../../consts/IMAGE";

export const UserProfile = () => {
    const { user} = useAuthUserContext();
    return (
        <Box bgImage={commonBG} bgSize='cover' overflow='hidden'>
            <Header subText='プロフィール'/>
            <HStack alignItems='flex-start'>
                <SideMenu menuList={menuListWhenSignIn}/>
                <Box w='100%' h='90vh' overflow='auto'>
                    <VStack alignItems='center'>
                        <Box>
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
                        </Box>
                    </VStack>
                </Box>
            </HStack>
        </Box>
    );
};

export default UserProfile;