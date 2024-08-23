import React from "react";
import { RouteProtecter } from "../components/RouteProtecter";
import RecommendBookTemplate from "../components/template/RecommendBook";

export const Books = () => {
    return (
         <RouteProtecter component={<RecommendBookTemplate/>} allowedRoles={['admin','manager','user']}/>
    );
}

export default Books;