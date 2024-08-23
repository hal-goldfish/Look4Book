import React from "react";
import { RouteProtecter } from "../components/RouteProtecter";
import { Books as BooksTemplate } from "../components/template/Books";

export const Books = () => {
    return (
         <RouteProtecter component={<BooksTemplate/>} allowedRoles={['admin','manager','user']}/>
    );
}

export default Books;