export interface LoginData {
    username: string,
    password: string,
}

export interface RegisterData extends LoginData {
    confirmedPassword: string,
    email: string,
}