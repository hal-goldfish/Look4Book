import React, { ReactNode, useEffect } from "react";
import { Roles } from "../types/Roles";
import { useAuthUserContext } from "../providers/AuthUser";
import { useRouter } from "next/router";
import { Text } from "@chakra-ui/react";
import { TOP_PAGE } from "../consts/PAGE";

type RouteProtecterProps = {
    component: ReactNode,
    redirect?: string,
    allowedRoles?: Roles[],
};

export const RouteProtecter = ({
    component,
    redirect,
    allowedRoles,
}:RouteProtecterProps) => {
    const router = useRouter();
    const {isUserLoading, isLogin ,user} = useAuthUserContext();
    useEffect(()=>{
        const isAllowed = isLogin && !!user && (allowedRoles||['admin']).includes(user.role);
        if(!isAllowed && !isUserLoading) router.push(redirect||TOP_PAGE);
    },[isUserLoading]);
    return (
        <>
            {isUserLoading? <Text>Loading...</Text> : component}
        </>
    );
};