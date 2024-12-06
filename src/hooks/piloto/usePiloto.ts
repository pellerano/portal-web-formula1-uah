import FetchApiServiceInstance from '@/helpers/FetchApiUtil'
import { IPiloto } from '@/models/IPiloto'
import { useEffect, useState } from 'react'

const usePiloto = () => {
    const [listData, setListData] = useState<Array<IPiloto>>([])

    useEffect(() => {
        FetchApiServiceInstance.getAll(`http://localhost:8087/portalWebFormula1/piloto`, (err) => {
            console.log("error custom")
        }).then( data => {
            let _data = (data as Array<IPiloto>)
            setListData([ ..._data ])
        }).catch(err => {
            console.log('err: ', err)
        }).finally(()=>{})
    }, [])

    return {
        listData
    }
}

export default usePiloto