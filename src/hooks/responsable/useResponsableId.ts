import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { IResponsable } from '@/models/IResponsable';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRef } from 'react';
import UtilInstance from '@/helpers/Util';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Este campo debe ser completado.' })
    .max(150),
    nombre: z
    .string()
    .min(5, { message: 'Este campo debe ser completado.' })
    .max(150),
    email: z
    .string()
    .min(10, { message: 'Este campo debe ser completado.' })
    .max(150),
    password: z
    .string()
    .min(8, { message: 'Este campo debe ser completado.' })
    .max(25),
});

const useResponsableId = (eId: Number, eMSeg: Number) => {
  const token = useAuthHeader();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      username: '',
      nombre: '',
      email: '',
      password: ''
    },
  });

  useEffect(() => {
    let statusDataId = 200;
    eId &&
      FetchApiServiceInstance.getById(
        `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/${eId}`,
        token,
        (err) => {
          console.log('error custom');
        }
      )
        .then((data) => {
          if (statusDataId === 200 && data) {
            let _data = data as IResponsable;
            form.setValue('id', _data.id);
            form.setValue('nombre', _data.nombre);
            form.setValue('username', _data.username);
            form.setValue('email', _data.email);
            form.setValue('password', '');
          }
        })
        .catch((err) => {})
        .finally(() => {});
  }, [eId, eMSeg]);

  const handleSave = async (e) => {
  
    const result = await (eId
      ? FetchApiServiceInstance.update(
          `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/by/equipo`,
          { ...form.getValues() },
          token,
          (err) => {
            console.log('error custom');
          }
        )
          .then((data) => {
            console.log('update -> ', data);
          })
          .catch((err) => {})
          .finally(() => {})
      : FetchApiServiceInstance.create(
          `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/by/equipo`,
          { ...form.getValues() },
          token,
          (err) => {
            console.log('error custom');
          }
        )
          .then((data) => {
            console.log('create -> ', data);
          })
          .catch((err) => {})
          .finally(() => {}));
    window.location.href = '/panel/responsables';
  };

  return { form, handleSave };
};

export default useResponsableId;
