import { RolesI } from "./roles";

export interface UserI {
    id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    passwod?: string;
    roles?: RolesI;
}
