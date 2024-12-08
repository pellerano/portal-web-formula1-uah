import FetchApiServiceInstance from '@/helpers/FetchApiUtil'
import { IPiloto } from '@/models/IPiloto'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRef } from 'react';
import UtilInstance from '@/helpers/Util'
import { AppWindow } from 'lucide-react'

const formSchema = z.object({
    nombre: z
      .string()
      .min(3, { message: 'Este campo debe ser completado.' })
      .max(150),
    apellidos: z
      .string()
      .min(3, { message: 'Este campo debe ser completado.' })
      .max(150),
    siglas: z
      .string()
      .min(3, { message: 'Este campo debe ser completado.' })
      .max(3),
    dorsal: z
      .string()
      .min(1, { message: 'Este campo debe ser completado.' })
      .max(3),
    pais: z
      .string()
      .min(1, { message: 'Este campo debe ser completado.' })
      .max(50),
    twitter: z
      .string()
      .min(1, { message: 'Este campo debe ser completado.' })
      .max(50),
    estado: z
      .string()
      .min(1, { message: 'Este campo debe ser completado.' })
      .max(1),
})

const usePilotoId = (eId: Number) => {
    const inputFoto = useRef(null);
    const [urlFotoB64, setUrlFotoB64] = useState("")
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { 
            id: 0,
            nombre: '',
            apellidos: '',
            siglas: '',
            dorsal: '',
            pais: '',
            twitter: '',
            estado: '',  
        },
    })

    useEffect(() => {
        let statusDataId = 200
        eId && FetchApiServiceInstance.getById(`http://localhost:8087/portalWebFormula1/pilotos/${eId}`, (err) => {
            console.log("error custom")
        }).then(data => {
            if (statusDataId === 200 && data) {
                let _data = data as IPiloto
                form.setValue('id', _data.id)
                form.setValue('nombre', _data.nombre)
                form.setValue('apellidos', _data.apellidos)
                form.setValue('siglas', _data.siglas)
                form.setValue('dorsal', _data.dorsal.toString())
                form.setValue('pais', _data.pais)
                form.setValue('twitter', _data.twitter)
                setUrlFotoB64(_data.dataurlb64 || "")
                form.setValue('estado', _data.estado.toString())
            }
        }).catch(err => { }).finally(() => { })
    }, [eId])

    const handleSave = async (e) => {
        let dataurlb64: String = ""
        try{
            dataurlb64 = await UtilInstance.FileToUrlBase64(inputFoto.current.files[0])
        }catch(e){}

        const result = await (eId ?
            FetchApiServiceInstance.update(`http://localhost:8087/portalWebFormula1/pilotos`, 
                { ...form.getValues(), dataurlb64 }, (err) => {
                    console.log("error custom")
            }).then(data => {
                console.log("update -> ", data)
            }).catch(err => { }).finally(() => { }) 
            :
            FetchApiServiceInstance.create(`http://localhost:8087/portalWebFormula1/pilotos`, 
                { ...form.getValues(), dataurlb64 }, (err) => {
                    console.log("error custom")
            }).then(data => {
                console.log("create -> ", data)
            }).catch(err => { }).finally(() => { })
        )
        window.location.href="/pilotos"
    }

    const getSigla = async () => {
        const { apellidos } = form.getValues()
        if (apellidos.trim() !== "") {
            form.setValue("siglas", apellidos.substring(0,3).toUpperCase())
        } else form.setValue("siglas", "")
    }

    return { form, handleSave, inputFoto, urlFotoB64, getSigla }
}

export default usePilotoId