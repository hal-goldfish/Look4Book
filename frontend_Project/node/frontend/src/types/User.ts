import { MyBook } from "./MyBook";
import { Roles } from "./Roles";

export type User = {
    id: number;
    name: string;
    role: Roles;
    bookCount: number;
    stateCount: number[];
    categoryCount: number[];
    bookList?: MyBook[];
}