/* Datos del objeto Usuario */

export interface User{
    id?: number,
    name?: string,
    email: string,
    password?:string,
    password_confirmation?:string,
    api_token?:string
}