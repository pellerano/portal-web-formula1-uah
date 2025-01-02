import FetchApiServiceInstance from '@/helpers/FetchApiUtil'
import UtilInstance from '@/helpers/Util'
//import { ICircuito } from '@/models/ICircuito'

async function  saveNewCircuit(data) {
	let dataurlb64: String = "";
	let response = "OK";
	try{
		dataurlb64 = await UtilInstance.FileToUrlBase64(data.trazado[0])
	}catch(e){
		alert(e);
	}
	
	data.trazado = dataurlb64;
	data = [data];
	//console.log(data);
    FetchApiServiceInstance.create(`http://localhost:8087/portalWebFormula1/circuitos`, 
       data, (err) => {
           console.log("error custom")
		   response="";
    }).then(data => {
            console.log("create -> ", data)
    }).catch(err => { response=""}).finally(() => { });
    
	return response;
    //window.location.href="/panel/circuits"
}
    
export default saveNewCircuit;