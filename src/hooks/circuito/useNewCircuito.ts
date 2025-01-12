import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import UtilInstance from '@/helpers/Util';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
//import { ICircuito } from '@/models/ICircuito'

async function saveNewCircuit(data) {
  const token = useAuthHeader();
  let dataurlb64: String = '';
  let response = 'OK';
  try {
    dataurlb64 = await UtilInstance.FileToUrlBase64(data.trazado[0]);
  } catch (e) {
    alert(e);
  }

  data.trazado = dataurlb64;
  data = [data];
  //console.log(data);
  FetchApiServiceInstance.create(
    `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/circuitos`,
    data,
    token,
    (err) => {
      console.log('error custom');
      response = '';
    }
  )
    .then((data) => {
      console.log('create -> ', data);
    })
    .catch((err) => {
      response = '';
    })
    .finally(() => {});

  return response;
  //window.location.href="/panel/circuits"
}

export default saveNewCircuit;
