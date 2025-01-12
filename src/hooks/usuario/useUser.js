import { useEffect, useState } from 'react';
import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

const useUser = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api`;
  const token = useAuthHeader();

  const getAllUsers = () => {
    FetchApiServiceInstance.getAll(`${url}/usuarios`, token)
      .then((data) => setUsers(data))
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  const getAllRoles = () => {
    FetchApiServiceInstance.getAll(`${url}/roles`)
      .then((data) => setRoles(data))
      .catch((err) => {
        console.log('err: ', err);
      });
  };

  const updateUser = async (user) => {
    try {
      const res = await FetchApiServiceInstance.update(
        `${url}/usuarios`,
        user,
        token
      );
      const updatedUserIndex = users.findIndex((x) => x.id === user.id);
      setUsers((curr) => {
        const temp = [...curr];
        temp[updatedUserIndex] = { ...user };
        return temp;
      });

      return res;
    } catch (error) {
      return error;
    }
  };

  const deleteUser = (user) => {};

  useEffect(() => {
    getAllUsers();
    getAllRoles();
  }, []);

  return {
    users,
    roles,
    setUsers,
    updateUser,
    deleteUser,
  };
};
export default useUser;
