import { Tooltip, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Text, FormErrorMessage } from "@chakra-ui/react";
import { Login, } from "@mui/icons-material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { USER_PROFILE } from "../../consts/PAGE";
import { login } from "../../functions/login";
import { useAuthUserContext } from "../../providers/AuthUser";

export const LogInButton = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [userName, setUserName] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [isInvalidUserName, setIsInvalidUserName] = useState(true);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const {signin} = useAuthUserContext();
    const router = useRouter();

    const onChangeUserName = (e: any) => {
        setUserName(e.target.value);
    };
    useEffect(()=>{
        setIsInvalidUserName(userName.length===0);
    },[userName]);

    const onChangePassword = (e: any) => {
        setPassword(e.target.value);
    };
    useEffect(()=>{
        setIsInvalidPassword(password.length===0);
    },[password]);

    const onCloseAndReset = () => {
        onClose();
        setUserName('');
        setPassword('');
        setErrorMessage(null);
    };

    const handleSignIn = async () => {
        const res = await login(userName, password);
        if(res.isSuccess && res.user && res.token){
            signin(res.user, res.token, ()=>{
                router.push(USER_PROFILE);
            })
        }else{
            setPassword('');
            setErrorMessage('ログインに失敗しました');
        }
    };
    return (
        <>
            <Tooltip label='ログイン'>
                <Button variant='ghost' onClick={onOpen}>
                    <Login fontSize="large"/>
                </Button>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onCloseAndReset}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>ログイン</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl isInvalid={isInvalidUserName} mb='12px'>
                            <FormLabel fontSize='smaller' fontWeight='bold'>ユーザー名</FormLabel>
                            <Input type='text' variant='flushed' placeholder="User name" value={userName} onChange={onChangeUserName} />
                            <FormErrorMessage color='red' fontSize='small'>ユーザー名を入力してください</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={isInvalidPassword}>
                            <FormLabel fontSize='smaller' fontWeight='bold'>パスワード</FormLabel>
                            <Input type='password' variant='flushed' placeholder="Password" value={password} onChange={onChangePassword} />
                            <FormErrorMessage color='red' fontSize='small'>パスワードを設定してください</FormErrorMessage>
                        </FormControl>
                        {errorMessage? <Text color='red'>{errorMessage}</Text> : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onCloseAndReset} colorScheme='red'>
                            閉じる
                        </Button>
                        <Button ml='8px' colorScheme="blue" onClick={handleSignIn}>
                            ログイン
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default LogInButton;