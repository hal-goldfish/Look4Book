import React from "react";
import { AuthUserProvider } from "./AuthUser";

type Props = {
    children: React.ReactNode
  }

export const Provider = (props: Props) => {
    return (
        <AuthUserProvider>
            {props.children}
        </AuthUserProvider>
    );
};