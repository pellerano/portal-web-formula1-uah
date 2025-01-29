'use client';
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import { React, useContext, useEffect, useState } from 'react';
import useCircuito from "@/hooks/circuito/useCircuito";
import deleteCircuit from "@/hooks/circuito/deleteCircuito";
import { Button } from '@/components/ui/button';
import { TrashIcon, UpdateIcon } from '@radix-ui/react-icons'; 
import NewsDialog from '@/components/ui/news-dialog';
import NewCircuits from './newCircuit';
import EditCircuits from './editCircuit';
import NewLoading from '@/components/ui/new-loading';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
  } from '@/components/ui/alert-dialog';

export default function PanelCircuits() {
  const { setBreadcrumbs } = useContext(Sidebar8Context);
  const { listData } = useCircuito();
  const [open, setOpen] = useState(false);
  const [openDialogEditCircuit, setOpenDialogEditCircuit] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [openMensaje, setOpenMensaje] = useState(false);
  const [idCircuito, setIdCircuito] = useState(null);

  useEffect(() => {
    setBreadcrumbs(['Gestión de Circuitos']);
	setMensaje("");
  }, []);

  const funcionCloseDialog = () => {    
	setOpen(false);
  };

  const funcionOpenLoading = ()=>{
	setOpenLoading(true);
  }

  const funcionCloseLoading = ()=>{
	setOpenLoading(false);
  }

  const token = useAuthHeader();

  const eliminarCircuito = async (id,token,setMensaje)=>{
	await deleteCircuit(id,token,setMensaje);
  }

  const actualizarCircuito = (id)=>{
	setIdCircuito(id);
	setOpenDialogEditCircuit(true);
  }

  return (
	  <div className="mt-5">
	      <h1>Gestión de Circuitos</h1>
			<NewsDialog 
				id="dialogNewCircuit"
				buttonTrigerProps={{value:"Nuevo", style:{background: 'black', color: 'white', padding: '1%', borderRadius: '10%'}}}
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
	      <table style={{borderSpacing: '17px 0px', borderCollapse: 'separate'}}>
	        <thead>
	          <tr>
				<th>id</th>
				<th>fecha</th>
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
	           <tr key={row.id}>
				  <td>{row.id}</td>
				  <td>{row.fecha}</td>
	              <td>{row.nombre}</td>
	              <td>{row.ciudad}</td>
	              <td>{row.pais}</td>
	              <td>{row.numeroVueltas}</td>
	              <td>{row.longitud}</td>
	              <td>{row.curvasLentas}</td>
	              <td>{row.curvasMedia}</td>
	              <td>{row.curvasRapidas}</td>
	              <td>
					<AlertDialog id={row.id}>
						<AlertDialogTrigger asChild>
							<Button variant="destructive" size="sm">
								<TrashIcon style={{ marginRight: '8px' }} />
							</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>¿Está seguro de eliminar el circuito?</AlertDialogTitle>
								<AlertDialogDescription>
									Recuerde que si el circuito está en calendario no será posible eliminarlo.
								</AlertDialogDescription>
							</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction onClick={() => {eliminarCircuito(row.id,token,setMensaje);setOpenMensaje(true)}}>
								Continuar
							</AlertDialogAction>
						</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				  </td>
	              <td>
          			<Button variant='default' onClick={()=>actualizarCircuito(row.id)}>
          				<UpdateIcon style={{ marginRight: '8px' }} />
          			</Button>
					
					{/*<NewsDialog 
						id={`dialogEditCircuit${row.id}`}
						buttonTrigerProps={{
							id:`botonEditarCircuito${row.id}`,
							value:<UpdateIcon style={{marginRight:'8px'}} />,
							style:{},
							variant:'default'
						}}
						dialogTitle=""
						description=""
						content={<EditCircuits 
									idCircuito={row.id}
									setOpenDialogEditCircuit={setOpenDialogEditCircuit}
								/>}
						open={openDialogEditCircuit}
						setOpen={setOpenDialogEditCircuit}
					/>*/}
	              </td>
	            </tr>
	          ))}
	        </tbody>
	      </table>
		  <NewLoading open={openLoading} />
		  <div>
			{
				(mensaje == "")?(
					<></>
				):(
					<AlertDialog id="mensaje" open={openMensaje}>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle></AlertDialogTitle>
								<AlertDialogDescription style={{backgroundColor:' #579eff61',borderRadius: '5px',padding: '1%'}}>
									{mensaje}
								</AlertDialogDescription>
							</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={() =>{setOpenMensaje(false);window.location.href="/panel/circuits"}}>Cerrar</AlertDialogCancel>
						</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				)
			}
		  </div>
		  <NewsDialog 
			id={`dialogEditCircuit${idCircuito}`}
			buttonTrigerProps={{}}
			dialogTitle=""
			description=""
			content={<EditCircuits 
						idCircuito={idCircuito}
						setOpenDialogEditCircuit={setOpenDialogEditCircuit}
					/>}
			open={openDialogEditCircuit}
			setOpen={setOpenDialogEditCircuit}
		  />
	    </div>  
	  );
}
