import React from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import router from "next/router";
import { Box, Button, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";

export const UserProfile = () => {
    const { user , signout} = useAuthUserContext();
    const handleSignOut = () => {
        signout(()=>{
            router.push('/');
        });
    };
    return (
        <VStack alignItems='center'>
            <Heading>プロフィール画面</Heading>
            <Link href='/'><Text color='blue'>トップページに戻る</Text></Link>
            <Box>
                <VStack>
                    <HStack>
                        <Text>ユーザー名</Text>
                        <Text>{user?.name}</Text>
                    </HStack>
                    <HStack>
                        <Text>ランク</Text>
                        <Text>{user?.role === 'user' ? '一般読書家' : 'その他'}</Text>
                    </HStack>
                </VStack>
            </Box>
            <Button onClick={handleSignOut}><Text>sign out</Text></Button>
        </VStack>
    );
};

export default UserProfile;