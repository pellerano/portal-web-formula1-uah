import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { IPiloto } from '@/models/IPiloto';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRef } from 'react';
import UtilInstance from '@/helpers/Util';
import { AppWindow } from 'lucide-react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

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
});

const usePilotoId = (eId: Number, eMSeg: Number) => {
  const inputFoto = useRef(null);
  const [urlFotoB64, setUrlFotoB64] = useState('');
  const token = useAuthHeader();

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
  });

  useEffect(() => {
    let statusDataId = 200;
    eId &&
      FetchApiServiceInstance.getById(
        `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/pilotos/${eId}`,
        token,
        (err) => {
          console.log('error custom');
        }
      )
        .then((data) => {
          if (statusDataId === 200 && data) {
            let _data = data as IPiloto;
            form.setValue('id', _data.id);
            form.setValue('nombre', _data.nombre);
            form.setValue('apellidos', _data.apellidos);
            form.setValue('siglas', _data.siglas);
            form.setValue('dorsal', _data.dorsal.toString());
            form.setValue('pais', _data.pais);
            form.setValue('twitter', _data.twitter);
            setUrlFotoB64(_data.dataurlb64 || '');
            form.setValue('estado', _data.estado.toString());
          }
        })
        .catch((err) => {})
        .finally(() => {});
  }, [eId, eMSeg]);

  const handleSave = async (e) => {
    let dataurlb64: String = '';
    try {
      dataurlb64 = await UtilInstance.FileToUrlBase64(
        inputFoto.current.files[0]
      );
    } catch (e) {}

    const result = await (eId
      ? FetchApiServiceInstance.update(
          `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/pilotos`,
          { ...form.getValues(), dataurlb64 },
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
          `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/pilotos`,
          { ...form.getValues(), dataurlb64 },
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
    window.location.href = '/panel/pilotos';
  };

  const getSigla = async () => {
    const { apellidos } = form.getValues();
    if (apellidos.trim() !== '') {
      form.setValue('siglas', apellidos.substring(0, 3).toUpperCase());
    } else form.setValue('siglas', '');
  };

  return { form, handleSave, inputFoto, urlFotoB64, getSigla };
};

export default usePilotoId;
