import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { IPiloto } from '@/models/IPiloto';
import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const usePiloto = () => {
  const [listData, setListData] = useState<Array<IPiloto>>([]);
  const token = useAuthHeader();

  useEffect(() => {
    FetchApiServiceInstance.getAll(
      `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/pilotos/equipo/0`,
      token,
      (err) => {
        console.log('error custom');
      }
    )
      .then((data) => {
        let _data = data as Array<IPiloto>;
        setListData([..._data]);

        console.log("YYY");
        console.log(_data);
        console.log(listData);
      })
      .catch((err) => {
        console.log('err: ', err);
      })
      .finally(() => {});
  }, []);

  console.log("RRRR");
  console.log(listData);

  return {
    listData,
  };
};

export default usePiloto;
