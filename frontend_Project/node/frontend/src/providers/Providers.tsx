import React from "react";
import { AuthUserProvider } from "./AuthUser";
import { ChakraProvider } from '@chakra-ui/react'

type Props = {
    children: React.ReactNode
  }

export const Provider = (props: Props) => {
    return (
        <ChakraProvider>
            <AuthUserProvider>
                {props.children}
            </AuthUserProvider>
        </ChakraProvider>
    );
};