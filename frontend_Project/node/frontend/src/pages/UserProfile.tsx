import React from "react";
import {UserProfile as UserProfileTemplate } from "../components/template/UserProfile";
import { RouteProtecter } from "../components/RouteProtecter";

export const UserProfile = () => {
    return (
        <RouteProtecter component={<UserProfileTemplate/>} allowedRoles={['admin','manager','user']}>
        </RouteProtecter>
    );
};

export default UserProfile;