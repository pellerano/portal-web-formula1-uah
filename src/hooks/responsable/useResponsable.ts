import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { IResponsable } from '@/models/IResponsable';
import { useEffect, useState } from 'react';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useResponsable = () => {
  const [listData, setListData] = useState<Array<IResponsable>>([]);
  const token = useAuthHeader();

  const [filteredData, setFilteredData] = useState<Array<IResponsable>>([]);
  const [openDialogEdit, setOpenDialogEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [idData, setIdData] = useState(null);


  const [statusFilter, setStatusFilter] = useState('all');

  // const filterByStatus = () => {
  //   if (statusFilter === 'all') {
  //     setFilteredData([]);
  //   } else if(statusFilter==='Baja') {
  //     const filtered = [...listData].filter((x) => x.estado === 0);
  //     setFilteredData(filtered);
  //   } else if(statusFilter==='Alta') {
  //     const filtered = [...listData].filter((x) => x.estado === 1);
  //     setFilteredData(filtered);
  //   }
  // };

  // useEffect(() => {
  //   filterByStatus();
  // }, [statusFilter]);

  const filter = (e) => {
    const value = e.target.value.toLowerCase();
    const data = filteredData.length ? filteredData : listData;
    if (!value) {
      setFilteredData([]);
    } else {
      const filtered = data.filter(
        (x) =>
          x.nombre.toLowerCase().includes(value) ||
          x.email.toLowerCase().includes(value)
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    FetchApiServiceInstance.getAll(
      `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/by/equipo`,
      token,
      (err) => {
        console.log('error custom');
      }
    )
      .then((data) => {
        let _data = data as Array<IResponsable>;
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

  const fnDeleteData = async (id)=>{
    const result = await FetchApiServiceInstance.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/usuarios/${id}/by/equipo`,
          {},
          token,
          (err) => {
            console.log('error custom');
          }
        )
        .then((data) => {
          console.log('delete -> ', data);
          setListData((curr) => {
            const temp = [...curr].filter((x) => x.id !== id);
            return temp;
          });
        })
        .catch((err) => {})
        .finally(() => {})
  }

  return {
    listData,
    filteredData,
    filter,
    openDialogEdit, setOpenDialogEdit,
    open, setOpen,
    openLoading, setOpenLoading,
    idData, fnUpdateData,
    fnDeleteData
  };
};

export default useResponsable;
