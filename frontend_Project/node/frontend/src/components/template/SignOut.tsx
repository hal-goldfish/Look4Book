import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthUserContext } from "../../providers/AuthUser";
import { useRouter } from "next/router";
import { TOP_PAGE } from "../../consts/PAGE";

export const SignOut = () => {
    const {signout} = useAuthUserContext();
    const router = useRouter();
    const onClick = () => {
        signout(()=>{
            router.push(TOP_PAGE);
        })
    };
    return (
        <Button onClick={onClick}><Text>サインアウト</Text></Button>
    );
};

export default SignOut;