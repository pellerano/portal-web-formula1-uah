import { IModel } from "@/models/IModel"

export interface IPiloto extends IModel {
    id: number
    nombre: string
    apellidos: string
    siglas: string
    dorsal: number
}