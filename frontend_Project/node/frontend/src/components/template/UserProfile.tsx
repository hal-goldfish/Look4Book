import React from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";

export const UserProfile = () => {
    const { user} = useAuthUserContext();
    return (
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
    );
};

export default UserProfile;