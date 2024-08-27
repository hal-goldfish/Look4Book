import React from "react";
import { AuthUserProvider } from "./AuthUser";
import { ChakraProvider } from '@chakra-ui/react'
import { CacheImageProvider } from './CacheImage';

type Props = {
    children: React.ReactNode
  }

export const Provider = (props: Props) => {
    return (
        <ChakraProvider>
            <AuthUserProvider>
                <CacheImageProvider>
                    {props.children}
                </CacheImageProvider>
            </AuthUserProvider>
        </ChakraProvider>
    );
};