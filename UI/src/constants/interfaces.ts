import { ReactNode } from "react";

export interface LoginData {
    email: string,
    password: string,
}

export interface RegisterData extends LoginData {
    firstName: string,
    lastName: string;
    confirmedPassword: string,
}


export interface NavMenuSection {
    items: Array<NavMenuItem>;
}

export interface NavMenuItem {
    name: string;
    label: string;
    callback: Function;
    icon: ReactNode;
}
export interface NavMenuData {
    sections: Array<NavMenuSection>;
}