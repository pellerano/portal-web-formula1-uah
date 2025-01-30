import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { ICircuito } from '@/models/ICircuito';
import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useVotacion = () => {
  const [listDataVotacion, setListDataVotacion] = useState([]);
  const token = useAuthHeader();

  useEffect(() => {
    FetchApiServiceInstance.getAll(
      `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/votacion`,
      token,
      (err) => {
        console.log('error custom');
      }
    )
      .then((data) => {
        console.log(data);
        //let _data = data as Array<ICircuito>;
        setListDataVotacion(data);
      })
      .catch((err) => {
        console.log('err: ', err);
      })
      .finally(() => {});
  }, []);

  return {
    listDataVotacion,
  };
};

export default useVotacion;
