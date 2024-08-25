import React from "react";
import { useAuthUserContext } from "../providers/AuthUser";
import { TopPage as TopPageTemplate } from "../components/template/TopPage";

export const Top = () => {
    return (
        <>
            <TopPageTemplate/>
        </>
    );
};

export default Top;