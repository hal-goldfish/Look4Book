import { Tooltip, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Text, FormErrorMessage } from "@chakra-ui/react";
import { PersonAdd } from "@mui/icons-material";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { POST_SIGNUP } from "../../consts/API";
import { USER_PROFILE } from "../../consts/PAGE";
import { login } from "../../functions/login";
import { useAuthUserContext } from "../../providers/AuthUser";

export const SignUpButton = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [userName, setUserName] = useState<String>('');
    const [password, setPassword] = useState<String>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<String>('');
    const [isInvalidUserName, setIsInvalidUserName] = useState(true);
    const [isInvalidPassword, setIsInvalidPassword] = useState(true);
    const [isInvalidPasswordConfirmation, setIsInvalidPasswordConfirmation] = useState(true);
    const [errorMessage, setErrorMessage] = useState<String | null>(null);
    const {signin} = useAuthUserContext();
    const router = useRouter();

    const onChangeUserName = (e) => {
        setUserName(e.target.value);
    };
    useEffect(()=>{
        setIsInvalidUserName(userName.length===0 || userName.length>15);
    },[userName]);

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    useEffect(()=>{
        setIsInvalidPassword(password.length===0);
    },[password]);

    const onChangePasswordConfirmation = (e) => {
        setPasswordConfirmation(e.target.value);
    };
    useEffect(()=>{
        setIsInvalidPasswordConfirmation(passwordConfirmation !== password);
    },[passwordConfirmation, password]);

    const onCloseAndReset = () => {
        onClose();
        setUserName('');
        setPassword('');
        setPasswordConfirmation('');
        setErrorMessage(null);
    };

    const handleSignUp = () => {
        setErrorMessage(null);
        axios.post(POST_SIGNUP,{
            name: userName,
            password: password,
            password_confirmation: passwordConfirmation,
        }).then(async () => {
            const res = await login(userName, password);
            if(res.isSuccess && res.user && res.token){
                signin(res.user, res.token, ()=>{
                    router.push(USER_PROFILE);
                })
            }else{
                setErrorMessage('サインアップ出来ましたがサインインに失敗しました。');
            }
        }).catch(()=>{
            setErrorMessage('サインアップに失敗しました');
        })
    };
    return (
        <>
            <Tooltip label='サインアップ'>
                <Button variant='ghost' onClick={onOpen}>
                    <PersonAdd fontSize="large"/>
                </Button>
            </Tooltip>
            <Modal isOpen={isOpen} onClose={onCloseAndReset}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>アカウント新規作成</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <FormControl isInvalid={isInvalidUserName} mb='12px'>
                            <FormLabel fontSize='smaller' fontWeight='bold'>ユーザー名</FormLabel>
                            <Input type='text' variant='flushed' placeholder="User name" value={userName} onChange={onChangeUserName} />
                            <FormErrorMessage color='red' fontSize='small'>1文字以上15文字以下で入力してください</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={isInvalidPassword}>
                            <FormLabel fontSize='smaller' fontWeight='bold'>パスワード</FormLabel>
                            <Input type='password' variant='flushed' placeholder="Password" value={password} onChange={onChangePassword} />
                            <FormErrorMessage color='red' fontSize='small'>パスワードを設定してください</FormErrorMessage>
                        </FormControl>
                        <FormControl isInvalid={isInvalidPasswordConfirmation}>
                            <FormLabel fontSize='smaller' fontWeight='bold'>パスワード確認</FormLabel>
                            <Input type='password' variant='flushed' placeholder="Password Confirmation" value={passwordConfirmation} onChange={onChangePasswordConfirmation} />
                            <FormErrorMessage color='red' fontSize='small'>同じ値を入力してください</FormErrorMessage>
                        </FormControl>
                        {errorMessage? <Text color='red'>{errorMessage}</Text> : null}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onCloseAndReset} colorScheme='red'>
                            閉じる
                        </Button>
                        <Button ml='8px' colorScheme="blue" onClick={handleSignUp} isDisabled={isInvalidUserName || isInvalidPassword || isInvalidPasswordConfirmation}>
                            サインアップ
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default SignUpButton;