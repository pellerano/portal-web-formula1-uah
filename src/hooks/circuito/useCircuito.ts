import FetchApiServiceInstance from '@/helpers/FetchApiUtil'
import { ICircuito } from '@/models/ICircuito'
import { useEffect, useState } from 'react'

const useCircuito = () => {
    const [listData, setListData] = useState<Array<ICircuito>>([])

    useEffect(() => {
        FetchApiServiceInstance.getAll(`http://localhost:8087/portalWebFormula1/circuitos`, (err) => {
            console.log("error custom")
        }).then( data => {
            let _data = (data as Array<ICircuito>)
            setListData([ ..._data ])
        }).catch(err => {
            console.log('err: ', err)
        }).finally(()=>{})
    }, [])


    return {
        listData
    }
}

export default useCircuito