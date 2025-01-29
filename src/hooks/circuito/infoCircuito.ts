import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { ICircuito } from '@/models/ICircuito';
import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const infoCircuito = (idCircuito,formularioSetValue,setUrlFotoB64) => {
  const [datosCircuito, setDatosCircuito] = useState<ICircuito>();
  const token = useAuthHeader();

  useEffect(() => {
    FetchApiServiceInstance.getById(
      `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/circuitos/${idCircuito}`,
      token,
      (err) => {
        console.log('error custom');
      }
    ).then((data) => {
        let _data = data as ICircuito;
        console.log("XXXX");
        console.log(_data);
        console.log(_data.nombre);
        setDatosCircuito(_data);

        formularioSetValue('id',_data.id);
        formularioSetValue('nombre',_data.nombre);
        formularioSetValue('ciudad',_data.ciudad);
        formularioSetValue('pais',_data.pais);
        setUrlFotoB64(_data.trazado || '');
        formularioSetValue('numeroVueltas',_data.numeroVueltas);
        formularioSetValue('longitud',_data.longitud);
        formularioSetValue('curvasLentas',_data.curvasLentas);
        formularioSetValue('curvasMedia',_data.curvasMedia);
        formularioSetValue('curvasRapidas',_data.curvasRapidas);
        formularioSetValue('fecha',_data.fecha);
    }).catch((err) => {
        console.log('err: ', err);
      })
      .finally(() => {});
  }, []);

  return {
    datosCircuito
  };
};

export default infoCircuito;
