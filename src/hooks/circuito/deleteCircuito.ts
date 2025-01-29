import FetchApiServiceInstance from '@/helpers/FetchApiUtil';

async function deleteCircuit(idCircuito, token, setMensaje) {
    let respuesta = "";
    idCircuito = parseInt(idCircuito);
    
    FetchApiServiceInstance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/circuitos`,
        idCircuito,
        token,
        (err) => {
            respuesta = err.error;
            setMensaje(respuesta);
            console.log(respuesta);
        }
    ).then((data) => {
        
        if(data.mensage){
            respuesta = data.mensage;
        }else{
            respuesta = data.error;
        }
        setMensaje(respuesta);
        console.log('create -> ', respuesta);
    });
}

export default deleteCircuit;
