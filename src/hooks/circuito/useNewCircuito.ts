import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import UtilInstance from '@/helpers/Util';

//import { ICircuito } from '@/models/ICircuito'

async function saveNewCircuit(data,token) {
  let dataurlb64: String = '';
  let response = 'OK';
  let urlSave = `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/circuitos`;
  try {
    dataurlb64 = await UtilInstance.FileToUrlBase64(data.trazado[0]);
  } catch (e) {
    alert(e);
  }

  data.trazado = dataurlb64;
  
  FetchApiServiceInstance.create(
    urlSave,
    data,
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
  //window.location.href="/panel/circuits"
}

export default saveNewCircuit;
