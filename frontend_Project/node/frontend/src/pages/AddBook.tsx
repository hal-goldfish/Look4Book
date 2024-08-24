import React from "react";
import { RouteProtecter } from "../components/RouteProtecter";
import { AddBookTemplate } from "../components/template/AddBook";

export const AddBook = () => {
    return (
         <RouteProtecter component={<AddBookTemplate/>} allowedRoles={['admin','manager','user']}/>
    );
}

export default AddBook;