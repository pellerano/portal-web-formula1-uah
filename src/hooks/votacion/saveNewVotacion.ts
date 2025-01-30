import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
//import { ICircuito } from '@/models/ICircuito'

async function saveNewVotacion(data,token) {
  let response = 'OK';
  console.log(data);
  let urlSave = `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/votacion`;
  
  FetchApiServiceInstance.create(
    urlSave,
    [data],
    token,
    (err) => {
      console.log('error custom');
      response = '';
    })
    .then((data) => {
      console.log('create -> ', data);
    })
    .catch((err) => {
      console.log(err);
      response = '';
    })
    .finally(() => {});

  return response;
}

export default saveNewVotacion;
