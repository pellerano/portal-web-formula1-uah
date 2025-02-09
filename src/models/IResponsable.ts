import { IModel } from "@/models/IModel"

export interface IResponsable extends IModel {
    id: number
    nombre: string,
    username: string,
    password: string,
    email: string
}