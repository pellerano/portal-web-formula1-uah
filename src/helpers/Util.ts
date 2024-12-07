import { IModel } from "@/models/IModel"
import { resolve } from "styled-jsx/css"

class Util {
    async FileToUrlBase64(file: any): Promise<String> {
        try {
            return new Promise<String>((resolve, reject)=> {
                const reader = new FileReader()
                reader.onload = e => {
                    const dataURL = reader.result as String;
                    resolve(dataURL)
                }
                reader.readAsDataURL(file)
            })
        } catch (err) {
            console.log('Error al crear datos!')
        }
        return new Promise<String>((resolve, reject)=>{
            resolve("")
        })
    }
}

const UtilInstance = new Util()
Object.freeze(UtilInstance)

export default UtilInstance