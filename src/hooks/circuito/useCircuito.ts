import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { ICircuito } from '@/models/ICircuito';
import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useCircuito = () => {
  const [listData, setListData] = useState<Array<ICircuito>>([]);
  const token = useAuthHeader();

  useEffect(() => {
    FetchApiServiceInstance.getAll(
      `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/circuitos`,
      token,
      (err) => {
        console.log('error custom');
      }
    )
      .then((data) => {
        let _data = data as Array<ICircuito>;
        setListData([..._data]);
      })
      .catch((err) => {
        console.log('err: ', err);
      })
      .finally(() => {});
  }, []);

  return {
    listData,
  };
};

export default useCircuito;
