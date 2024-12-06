import FetchApiServiceInstance from '@/helpers/FetchApiUtil'
import { IPiloto } from '@/models/IPiloto'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
})

const usePilotoId = (eId: Number) => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { 
            id: 0,
            nombre: '',
            apellidos: '',
            siglas: '',
            dorsal: '' },
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
            }
        }).catch(err => { }).finally(() => { })
    }, [eId])

    const handleSave = () => {
        console.log("guardar")
    }

    return { form, handleSave }
}

export default usePilotoId