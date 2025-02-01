import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { IPiloto } from '@/models/IPiloto';
import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const usePiloto = () => {
  const [listData, setListData] = useState<Array<IPiloto>>([]);
  const token = useAuthHeader();

  const [filteredData, setFilteredData] = useState<Array<IPiloto>>([]);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [idData, setIdData] = useState(null);


  const [statusFilter, setStatusFilter] = useState('all');

  const filterByStatus = () => {
    if (statusFilter === 'all') {
      setFilteredData([]);
    } else if(statusFilter==='Baja') {
      const filtered = [...listData].filter((x) => x.estado === 0);
      setFilteredData(filtered);
    } else if(statusFilter==='Alta') {
      const filtered = [...listData].filter((x) => x.estado === 1);
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    filterByStatus();
  }, [statusFilter]);

  const filter = (e) => {
    const value = e.target.value.toLowerCase();
    const data = filteredData.length ? filteredData : listData;
    if (!value) {
      setFilteredData([]);
    } else {
      const filtered = data.filter(
        (x) =>
          x.nombre.toLowerCase().includes(value) ||
          x.apellidos.toLowerCase().includes(value) ||
          x.pais.toLocaleLowerCase().includes(value)
      );
      setFilteredData(filtered);
    }
  };

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
      })
      .catch((err) => {
        console.log('err: ', err);
      })
      .finally(() => {});
  }, []);

  const fnUpdateData = (id)=>{
    console.log(openDialogEdit)
    setIdData(id);
    if (openDialogEdit) {
      setOpenDialogEdit(false)
      setTimeout(() => {
        setOpenDialogEdit(true)
      })
    }else setOpenDialogEdit(() => true)
    }

  return {
    listData,
    filteredData,
    filter,
    openDialogEdit, setOpenDialogEdit,
    statusFilter, setStatusFilter,
    open, setOpen,
    openLoading, setOpenLoading,
    idData, fnUpdateData
  };
};

export default usePiloto;
