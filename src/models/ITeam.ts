import { IModel } from "@/models/IModel"

export interface ITeam extends IModel {
    id: number
    nombre: string
    twitter: string
    logo: string
}