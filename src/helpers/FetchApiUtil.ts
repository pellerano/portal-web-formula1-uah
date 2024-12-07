import { IModel } from "@/models/IModel"

class FetchApiUtil {
    async getAll(path: string, handleError?: (error: {}) => void): Promise<Array<IModel> | undefined> {
        try {
            let _result = await fetch(`${path}`)
            if (!_result) return undefined
            let _dataList = (await _result.json()) as Array<IModel>
            return _dataList
        } catch (err) {
            handleError && handleError(err)
            console.log('Error al retornar datos DB!')
        }
        return undefined
    }

    async getById(path: string, handleError?: (error: {}) => void): Promise<IModel | undefined> {
        try {
            let _result = await fetch(`${path}`)
            if (!_result) return undefined
            let _data = (await _result.json()) as IModel
            return _data
        } catch (err) {
            handleError && handleError(err)
            console.log('Error al retornar datos DB!')
        }
        return undefined
    }

    async create(path: string, data: IModel, handleError?: (error: {}) => void): Promise<IModel | undefined> {
        try {
            let _result = await fetch(`${path}`, 
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            if (!_result) return undefined
            let _data = (await _result.json()) as IModel
            return _data
        } catch (err) {
            handleError && handleError(err)
            console.log('Error al retornar datos DB!')
        }
        return undefined
    }

    async update(path: string, data: IModel, handleError?: (error: {}) => void): Promise<IModel | undefined> {
        try {
            let _result = await fetch(`${path}`, 
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify(data)
            })
            if (!_result) return undefined
            let _data = (await _result.json()) as IModel
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