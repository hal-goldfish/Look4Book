import React, { useEffect, useRef } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { Box, Button, Flex, Grid, HStack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { Header } from "../orgnism/Header";
import { commonBG } from "../../consts/IMAGE";
import { SimpleCard } from './../orgnism/SimpleCard';
import { STATES } from "../../consts/States";
import { CATEGORIES } from "../../consts/Categories";
import { Refresh } from "@mui/icons-material";

const UserProfile = () => {
    const { user, fetchUser } = useAuthUserContext();
    return (
        <>
            { (!!user) ?
                <VStack w='100%' maxH='100%' overflow='auto'>
                    <HStack>
                        <Flex h='10%' px={5} bg='rgba(50,50,200,0.5)'>
                            <Text fontSize='xx-large' fontWeight='bold'>
                                {(user?.name||'') + '　のダッシュボード'}
                            </Text>
                        </Flex>
                        <Tooltip label='更新'>
                            <Button variant='ghost' onClick={fetchUser}>
                                    <Refresh/>
                            </Button>
                        </Tooltip>
                    </HStack>
                    <VStack maxH='90%' p={2} bg='rgba(200,100,0,0.5)' overflow='auto'>
                        <HStack>
                            {user.stateCount.map((value, idx) => {
                                const label = STATES.state[idx];
                                return (
                                    <SimpleCard label={label} value={String(value)} size='large'/>
                                );
                            })}
                        </HStack>
                        <Grid templateColumns='repeat(4, 1fr)' gap={2}>
                            {user.categoryCount.map((value, idx) => {
                                const label = CATEGORIES.categories[idx];
                                return (
                                    <SimpleCard label={label} value={String(value)} size='normal'/>
                                );
                            })}
                        </Grid>
                    </VStack>
                </VStack>
            : null}
        </>
    );
}

export const UserProfileTemplate = () => {
    return (
        <VStack bgImage={commonBG} bgSize='cover' bgRepeat='no-repeat' h='100vh' overflow='hidden'>
            <Header curPage='プロフィール'/>
            <Flex w='100%' h='90vh' alignItems='center' justify='center'>
                <Box alignItems='center' w='90%' maxW='90%' h='90%' bgColor='rgba(255,255,255,0.5)' p='8px'>
                    <UserProfile/>
                </Box>
            </Flex>
        </VStack>
    );
};

export default UserProfileTemplate;