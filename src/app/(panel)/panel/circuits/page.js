'use client';
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import { React, useContext, useEffect, useState } from 'react';
import useCircuito from "@/hooks/circuito/useCircuito"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'; // Importamos el ícono de la papelera
import { FaSync } from 'react-icons/fa'; // Importamos el ícono de actualizar
import NewsDialog from '@/components/ui/news-dialog';
import NewCircuits from './newCircuit';
import NewLoading from '@/components/ui/new-loading';



export default function PanelCircuits() {
  const { setBreadcrumbs } = useContext(Sidebar8Context);
  const { listData } = useCircuito();
  const [ open, setOpen] = useState(false);
  const [ openLoading, setOpenLoading] = useState(false);

  useEffect(() => {
    setBreadcrumbs(['Gestión de Circuitos']);
  }, []);

  /*useEffect(() => {
    setOpen(open);
  }, [open]);*/

  const funcionOpenDialog = () => {    
	setOpen(true);
  };

  const funcionCloseDialog = () => {    
	setOpen(false);
	console.log("XXXX");
	console.log(open);
  };

  const funcionOpenLoading = ()=>{
	setOpenLoading(true);
	//console.log("CLICK ME");
  }

  const funcionCloseLoading = ()=>{
	setOpenLoading(false);
	//console.log("CLICK ME FALSE");
  }

  return (
	  <div className="mt-5">
	      <h1>Gestión de Circuitos</h1>
			<NewsDialog 
				id="dialogNewCircuit"
				buttonTrigerProps={{value:"Nuevo"}}
				dialogTitle=""
				description=""
				content={<NewCircuits 
							funcionCloseDialog={funcionCloseDialog} 
							funcionOpenLoading={funcionOpenLoading}
							funcionCloseLoading={funcionCloseLoading}
						/>}
				open={open}
				setOpen={setOpen}
			/>
	      <table>
	        <thead>
	          <tr>
	            <th>ID</th>
	            <th>Nombre</th>
	            <th>ciudad</th>
	            <th>País</th>
	            <th>numeroVueltas</th>
	            <th>longitud</th>
	            <th>curvas Lentas</th>
	            <th>curvas Media</th>
	            <th>curvas Rapidas</th>
	            <th></th>
	            <th></th>
	          </tr>
	        </thead>
	        <tbody>
	          {listData.map((row) => (
	           <tr key={row.Id}>
	              <td>{row.nombre}</td>
	              <td>{row.ciudad}</td>
	              <td>{row.pais}</td>
	              <td>{row.numeroVueltas}</td>
	              <td>{row.longitud}</td>
	              <td>{row.curvasLentas}</td>
	              <td>{row.curvasMedia}</td>
	              <td>{row.curvasRapidas}</td>
	              <td>
          			<Button variant='default'>
          				<Link href={`/circuits/${row.Id}`}>
          				<FaTrash style={{ marginRight: '8px' }} />
          				</Link>
          			</Button>
				  </td>
	              <td>
          			<Button variant='default'>
          				<FaSync style={{ marginRight: '8px' }} />
          			</Button>
	              </td>
	            </tr>
	          ))}
	        </tbody>
	      </table>
		  <NewLoading open={openLoading} />
	    </div>  
	  );
}
