import { RolesI } from "./roles";

export interface UserI {
    id?: string;
    name?: string;
    email?: string;
    passwod?: string;
    roles?: RolesI;
}
