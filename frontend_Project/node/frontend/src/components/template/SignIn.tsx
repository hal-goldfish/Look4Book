import React, { useEffect, useState } from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { useRouter } from "next/router";
import axios from "axios";
import { GET_USER } from "../../consts/API";
import { login } from "../../functions/login";
import { Box, Button, FormControl, FormLabel, HStack, Input, Link, Text, VStack } from "@chakra-ui/react";
import { SIGN_UP, USER_PROFILE } from "../../consts/PAGE";

export const SignIn = () => {
    const {signin} = useAuthUserContext();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isError, setIsError] = useState(false);
    const [userList, setUserList] = useState<String[]>(['']);
    const router = useRouter();

    const getUsers = async () => {
        const res = await axios.get(GET_USER);
        setUserList(res.data.map((user) => new String(user['name'])));
    };

    useEffect(()=>{
        getUsers();
    },[]);
    const handleSignIn = async () => {
        const res = await login(userName, password);
        if(res.isSuccess && res.user && res.token){
            signin(res.user, res.token, ()=>{
                router.push(USER_PROFILE);
            })
        }else{
            setPassword('');
            setIsError(true);
        }
    };
    return (
        <VStack alignItems='center'>
            <Link href={SIGN_UP}><Text color='blue'>サインアップはこちら</Text></Link>
            <Box h='300px' w='600px' borderColor='black' borderWidth='2px' overflow='auto'>
                {userList.map((user, id) => <Text fontSize='16px'>{id}.{user}</Text>)}
            </Box>
            <FormControl w='600px'>
                <FormLabel><Text>ユーザー名とパスワードを入力してください</Text></FormLabel>
                <HStack spacing='16px'>
                    <Input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)} placeholder="ユーザーネーム" isInvalid={userName.length===0}></Input>
                    <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" isInvalid={password.length===0}></Input>
                </HStack>
                <Button onClick={handleSignIn} isDisabled={userName.length===0 || password.length===0}>sign in</Button>
            </FormControl>
            {isError ? <Text color='red'>サインインに失敗しました</Text> : null}
        </VStack>
    )
};

export default SignIn;