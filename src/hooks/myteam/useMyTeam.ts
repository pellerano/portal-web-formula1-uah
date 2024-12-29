import FetchApiServiceInstance from '@/helpers/FetchApiUtil'
import { ITeam } from '@/models/ITeam'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRef } from 'react';
import UtilInstance from '@/helpers/Util'

const formSchema = z.object({
    nombre: z
      .string()
      .min(3, { message: 'Este campo debe ser completado.' })
      .max(150),
    twitter: z
      .string()
      .min(1, { message: 'Este campo debe ser completado.' })
      .max(50),
})

const useMyTeam = (eId: Number) => {
    const inputFoto = useRef(null);
    const [urlFotoB64, setUrlFotoB64] = useState("")
    const [idEquipo, setIdEquipo] = useState(0)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { 
            id: 0,
            nombre: '',
            twitter: ''
        },
    })

    useEffect(() => {
        let statusDataId = 200
        FetchApiServiceInstance.getById(`http://localhost:8087/api/equipos/0`, (err) => {
            console.log("error custom")
            setIdEquipo(0)
        }).then(data => {
            if (statusDataId === 200 && data) {
                let _data = data as ITeam
                form.setValue('id', _data.id)
                form.setValue('nombre', _data.nombre)
                form.setValue('twitter', _data.twitter.replace("@", ""))
                setUrlFotoB64(_data.logo || "")
                setIdEquipo(_data.id)
            }
        }).catch(err => { }).finally(() => { })
    }, [eId])

    const handleSave = async (e) => {
        let dataurlb64: String = ""
        try{
            dataurlb64 = await UtilInstance.FileToUrlBase64(inputFoto.current.files[0])
        }catch(e){}

        const result = await (idEquipo ?
            FetchApiServiceInstance.update(`http://localhost:8087/api/equipos`, 
                { ...form.getValues(), logo: dataurlb64 }, (err) => {
                    console.log("error custom")
            }).then(data => {
                console.log("update -> ", data)
            }).catch(err => { }).finally(() => { }) 
            :
            FetchApiServiceInstance.create(`http://localhost:8087/api/equipos`, 
                { ...form.getValues(), logo: dataurlb64 }, (err) => {
                    console.log("error custom")
            }).then(data => {
                console.log("create -> ", data)
            }).catch(err => { }).finally(() => { })
        )
        window.location.href="/panel/myteam"
    }

    const goTwitter = () => {
        let { twitter } = { ...form.getValues() }
        if (twitter === "") return
        twitter = twitter.replace("@","")
        window.open(`https://x.com/${twitter}`, '_blank')
    }

    return { form, handleSave, inputFoto, urlFotoB64, goTwitter }
}

export default useMyTeam