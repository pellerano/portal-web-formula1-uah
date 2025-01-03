import { IModel } from "@/models/IModel"

export interface ICircuito extends IModel {   
    Id: number;
	nombre: string;
	ciudad: string;
	pais: string;
	trazado: string;
	numeroVueltas: number;
	longitud: number;
	curvasLentas: number;
	curvasMedia: number;
	curvasRapidas:number;
	fecha:Date;
	
}