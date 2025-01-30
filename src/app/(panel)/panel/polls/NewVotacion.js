'use client'
import saveNewVotacion from '@/hooks/votacion/saveNewVotacion';
import { React, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TypographyH3 } from "@/components/ui/typographyH3"
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';
import { Label } from '@/components/ui/label';


export default function NewCircuits({
    listDataPilotos,
    setOpenDialog
}) {
  
  const [pilotos, setPilotos] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [numCheckboxSeleccionados, setNumCheckboxSeleccionados] = useState(0);

  const token = useAuthHeader();
  const { setBreadcrumbs } = useContext(Sidebar8Context);
  const form = useForm({
    defaultValues: {
        permalink:'',
	    titulo:'',
	    descripcion:'',
	    limite:null,
        listaPilotos:'',
        piloto:[],
   }});
  
   
  useEffect(() => {
    setBreadcrumbs(['Gestión de Votaciones']);
  }, []);
   
  const handleSave = async (data) => {
    //actualizar el hook del formulario, para el campo listaPilotos
    data.listaPilotos = "["+pilotos.join(",")+"]";

    //validar que se tengan mínimo 5 y máximo 10 actores seleccionados
    if(numCheckboxSeleccionados >=5 && numCheckboxSeleccionados <=10){
        setOpenDialog(false);
  
        const success = await saveNewVotacion(data,token);

        setTimeout(() => {
        console.log("¡Ha pasado un segundo!");
        window.location.href="/panel/polls";
        }, 1000); // 1000 ms = 1 segundo
    }else{
        setMensaje("se requieren mínimo 5 y máximo 10 actores seleccionados")
    }
    
  }

  const cambioCheck = (e)=>{
    const { value, name, checked } = e.target;

    setCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [name]: checked,
    }));

    if(checked){
        //si el id piloto NO existe en el arreglo, entonces lo agrega
        if(!pilotos.includes(value)){
            setPilotos((prevNumeros) => [...prevNumeros, value]);
            setNumCheckboxSeleccionados(numCheckboxSeleccionados+1);
        }
    }else{
        //si se quita el check, se elimina de la lista
        setPilotos((prevNumeros) => prevNumeros.filter((num) => num !== value));
        setNumCheckboxSeleccionados(numCheckboxSeleccionados-1);
    }
  }

  return (
        <div className="container px-4 mx-auto md:px-6 lg:px-8">
            <TypographyH3 text={'Nueva votacion'}/>
            <hr />
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSave)}
                className="space-y-8 py-5"
                encType="multipart/form-data"
              >
                <FormField
                  control={form.control}
                  name="permalink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">permalink</FormLabel>
                      <FormControl>
                        <Input 
                        	{...field} 
	                        {...form.register("permalink", {
					            required: "Este campo es obligatorio",
					            minLength: {
					              value: 3,
					              message: "Este campo debe tener al menos 3 caracteres",
					            },
					            maxLength: {
					              value: 255,
					              message: "Este campo debe tener máximo 255 caracteres", 
					            },
					         })}
	                        className="bg-white"
	                    />
                      </FormControl>
                      <FormMessage className="font-light text-red-600">
                      {form.formState.errors.permalink?.message}
		              </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="titulo"
                  value=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        titulo
                      </FormLabel>
                      <FormControl>
                        <Input 
                        	{...field} 
	                        {...form.register("titulo", {
					            required: "Este campo es obligatorio",
					            minLength: {
					              value: 3,
					              message: "Este campo debe tener al menos 3 caracteres",
					            },
					            maxLength: {
					              value: 255,
					              message: "Este campo debe tener máximo 255 caracteres", 
					            },
					         })}
                        	onChange={(e) =>{
                                field.onChange(e)  
	                        }} 
	                        className="bg-white" 
	                     />
                      </FormControl>
                      <FormMessage className="font-light text-red-600">
		              </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="descripcion"
                  value=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        descripcion
                      </FormLabel>
                      <FormControl>
                        <Input 
                        	{...field} 
                        	{...form.register("descripcion", {
					            required: "Este campo es obligatorio",
					            minLength: {
					              value: 3,
					              message: "Este campo debe tener al menos 3 caracteres",
					            },
					            maxLength: {
					              value: 255,
					              message: "Este campo debe tener máximo 255 caracteres", 
					            },
					         })}
                        	 onChange={(e) =>{
	                            field.onChange(e)
	                         }} 
	                         className="bg-white" 
	                     />
                      </FormControl>
                      <FormMessage className="font-light text-red-600">
		              </FormMessage>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="limite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        limite
                      </FormLabel>
                      <FormControl>
                        <Input
                        	type="datetime-local"
	                      	className="bg-white" 
	                      	{...field} 
	                      	{...form.register("limite", {
                                required: "Este campo es obligatorio",
                          })}
	                      	onChange={(e) =>{ field.onChange(e)}} 
                        />
                      </FormControl>
                      <FormMessage className="font-light text-red-600">
		              </FormMessage>
                    </FormItem>
                  )}
                />

                {(mensaje)?
                    (
                        <div>
                            <Label style={{color:'red'}}>
                                {mensaje}
                            </Label>
                        </div>
                    ):(
                        <></>
                )}

                <div style={{height:'150px',
                overflowY:'auto',
                border: '1px solid #80808078',
                borderRadius: '5px',
                padding: '2%'}}>
                    {(listDataPilotos)?(
                        listDataPilotos.map((piloto)=>(
                            <div>
                                <input type="checkbox" 
                                    name={`piloto${piloto.id}`} 
                                    defaultChecked={(checkboxes[`piloto${piloto.id}`])?true:false} 
                                    key={`piloto${piloto.id}`} 
                                    id={piloto.id}
                                    className="seleccionPiloto font-medium" 
                                    style={{marginRight:'2%'}}
                                    value={piloto.id}
                                    onChange={cambioCheck}>
                                </input>
                                <Label>
                                    {`${piloto.nombre} ${piloto.apellidos}`}
                                </Label>
                            </div>
                        ))
                    ):(
                        <></>
                    )}
                </div>
                
                <Button type="submit">Guardar</Button>
              </form>
            </Form>
        </div>
    )
}
 