import { MyBook } from "./MyBook";
import { Roles } from "./Roles";

export type User = {
    id: Number;
    name: String;
    role: Roles;
    bookCount: Number;
    stateCount: Number[];
    categoryCount: Number[];
    bookList?: MyBook[];
}