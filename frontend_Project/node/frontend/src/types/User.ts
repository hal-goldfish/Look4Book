import { Roles } from "./Roles";

export type User = {
    id: number;
    name: string;
    role: Roles;
}