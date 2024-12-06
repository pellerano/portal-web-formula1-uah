import { IModel } from "@/models/IModel"

class FetchApiUtil {
    async getAll(path: string, handleError?: (error: {}) => void): Promise<Array<IModel> | undefined> {
        try {
            let _result = await fetch(`${path}`)
            if (!_result) return undefined
            let _data = (await _result.json()) as Array<IModel>
            return _data
        } catch (err) {
            handleError && handleError(err)
            console.log('Error al retornar datos DB!')
        }
        return undefined
    }
}

const FetchApiServiceInstance = new FetchApiUtil()
Object.freeze(FetchApiServiceInstance)

export default FetchApiServiceInstance