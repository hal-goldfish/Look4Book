import { Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

export const Top = () => {
    return (
        <VStack alignItems='center' display='flex'>
            <Heading><Text color='green'>Look4Bookへようこそ！</Text></Heading>
            <HStack>
                <Link href='/SignIn'><Text fontSize='16px'>サインインはこちら</Text></Link>
                <Link href='/SignUp'><Text fontSize='16px'>サインアップはこちら</Text></Link>
            </HStack>
                <Link href='/UserProfile'><Text>プロフィール画面はこちら</Text></Link>
        </VStack>
    );
};

export default Top;