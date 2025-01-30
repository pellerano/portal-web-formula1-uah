'use client';
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import { React, useContext, useEffect, useState } from 'react';
import useVotacion from "@/hooks/votacion/useVotacion";
import usePiloto from "@/hooks/piloto/usePiloto";
import { Button } from '@/components/ui/button';
import { TrashIcon, UpdateIcon } from '@radix-ui/react-icons'; 
import NewsDialog from '@/components/ui/news-dialog';
import NewVotacion from './NewVotacion';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

export default function PanelPolls() {
  const { setBreadcrumbs } = useContext(Sidebar8Context);
  const { listDataVotacion } = useVotacion();
  const [openDialog, setOpenDialog] = useState(false);
  const {listData} = usePiloto();

  useEffect(() => {
    setBreadcrumbs(['Gestión de Votaciones']);
  }, []);


  const funcionCloseDialog = () => {    
	setOpen(false);
  };

  const token = useAuthHeader();

  console.log("XXXX-hhhhhh2");
  console.log(listData);
  return (
	  <div className="mt-5">
	      <h1>Gestión de Votaciones</h1>
        <NewsDialog 
          id="dialogNewCircuit"
          buttonTrigerProps={{value:"Nuevo", style:{background: 'black', color: 'white', padding: '1%', borderRadius: '10%'}}}
          dialogTitle=""
          description=""
          content={<NewVotacion 
              listDataPilotos={listData}
              setOpenDialog={setOpenDialog} 
            />}
          open={openDialog}
          setOpen={setOpenDialog}
        />
	      <table style={{ borderSpacing: '17px 0px', 
                        borderCollapse: 'separate',
                        backgroundColor: '#d0d2d630',
                        borderRadius: '5px',
                        marginTop: '2%',
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'}}>
	        <thead>
	          <tr>
              <th>id</th>
              <th>permalink</th>
	            <th>titulo</th>
	            <th>descripcion</th>
	            <th>limite</th>
	            <th>Pilotos</th>
	          </tr>
	        </thead>
	        <tbody>
	          {listDataVotacion.map((row) => (
	           <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.permalink}</td>
	              <td>{row.titulo}</td>
	              <td>{row.descripcion}</td>
	              <td>{row.limite}</td>
	              <td>{row.piloto.map((piloto) => (`${piloto.id} - ${piloto.nombre} ${piloto.apellidos}, `))}</td>
	            </tr>
	          ))}
	        </tbody>
	      </table>
	    </div>  
	  );
}
