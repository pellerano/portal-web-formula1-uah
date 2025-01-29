import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import UtilInstance from '@/helpers/Util';

const updateCircuit = async (data,token,urlFotoB64) => {
  let dataurlb64: String = '';
    
  try {
    console.log(data.trazado);
    if(data.trazado){
        dataurlb64 = await UtilInstance.FileToUrlBase64(data.trazado[0]);
    }
  } catch (e) {
    alert(e);
  }

  console.log(urlFotoB64);
  console.log("VVVVV--");
  console.log(data);
  if(dataurlb64.length > 0){
    data.trazado = dataurlb64;
  }else{
    data.trazado = urlFotoB64;
  }

  FetchApiServiceInstance.update(
    `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/circuitos`,
    data,
    token,
    (err) => {
      console.log('error custom');
    }
  ).then((data) => {
      console.log('update -> ', data);
    }).catch((err) => {}).finally(() => {})
};

export default updateCircuit;
