import axios from "axios";
import React, { useState } from "react";
import { POST_SIGNUP } from "../../consts/API";
import { useRouter } from "next/router";
import { login } from "../../functions/login";
import { useAuthUserContext } from "../../providers/AuthUser";
import { Button, FormControl, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { USER_PROFILE } from "../../consts/PAGE";

export const SignUp = () => {
    const router = useRouter();
    const {signin} = useAuthUserContext();
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
        <VStack alignItems='center'>
            <FormControl w='600px'>
                <FormLabel><Text>ユーザー名とパスワードを入力してください</Text></FormLabel>
                <VStack spacing='16px'>
                    <Input type='text' value={userName} onChange={(e)=>setUserName(e.target.value)}
                        placeholder="ユーザーネーム" isInvalid={userName.length===0}></Input>
                    <Input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}
                        placeholder="パスワード" isInvalid={password.length===0}></Input>
                    <Input type='password' value={passwordConfirmation} onChange={(e)=>setPasswordConfirmation(e.target.value)}
                        placeholder="パスワード再入力" isInvalid={passwordConfirmation.length===0 || password!==passwordConfirmation}></Input>
                </VStack>
                <Button onClick={handleSignUp} isDisabled={userName.length === 0 || password.length === 0 || password !== passwordConfirmation}>sign up</Button>
                {errorMessage? <Text color='red'>{errorMessage}</Text>:null}
            </FormControl>
        </VStack>
    )
};

export default SignUp;