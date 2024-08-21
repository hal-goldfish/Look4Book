import React from "react";
import {UserProfile as UserProfileTemplate } from "../components/template/UserProfile";
import { RouteProtecter } from "../components/RouteProtecter";
import { Header } from "../components/orgnism/Header";

export const UserProfile = () => {
    return (
        <>
            <Header subText='プロフィール'/>
            <RouteProtecter component={<UserProfileTemplate/>} allowedRoles={['admin','manager','user']}/>
        </>
    );
};

export default UserProfile;