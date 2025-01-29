'use client'
import updateCircuit from '@/hooks/circuito/updateCircuit';
import { React, useContext, useEffect, useState, useRef } from 'react';
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
import infoCircuito from "@/hooks/circuito/infoCircuito";


export default function EditCircuits({
    idCircuito,
    setOpenDialogEditCircuit,
    }) {

    const form = useForm({
        defaultValues: {
              nombre: '',
            ciudad: '',
            pais:'',
            trazado: null,
            numeroVueltas: 0,
            longitud: 0,
            curvasLentas: 0,
            curvasMedia: 0,
            curvasRapidas: 0
    }});
    const [urlFotoB64, setUrlFotoB64] = useState('');
    const dataCircuito = infoCircuito(idCircuito,form.setValue,setUrlFotoB64);
    const inputFoto = useRef(null);
    const { setBreadcrumbs } = useContext(Sidebar8Context);
    const token = useAuthHeader();
   
  useEffect(() => {
    setBreadcrumbs(['Gestión de Circuitos']);
  }, []);
   
  const handleUpdate = async (data) => {
    setOpenDialogEditCircuit(false);

    const success = await updateCircuit(data,token,urlFotoB64);

    setTimeout(() => {
      console.log("¡Ha pasado un segundo!");
      window.location.href="/panel/circuits";
    }, 1000); // 1000 ms = 1 segundo
    
  }

  return (
        <div className="container px-4 mx-auto md:px-6 lg:px-8">
            <TypographyH3 text={'Editar Circuito'}/>
            <hr />
            <Form {...form}>
            <form
                id={`formularioEditarCircuito${idCircuito}`}
                onSubmit={form.handleSubmit(handleUpdate)}
                className="space-y-8 py-5"
                encType="multipart/form-data"
              >
                <FormField
                  control={form.control}
                  name="id"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                        	{...field} 
	                        {...form.register("id", {  
					         })}
	                        className="bg-white"
                            style={{ display: 'none' }}
	                    />
                      </FormControl>
                      <FormMessage className="font-light text-red-600">
                      {form.formState.errors.nombre?.message}
		              </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Nombres</FormLabel>
                      <FormControl>
                        <Input 
                        	{...field} 
	                        {...form.register("nombre", {
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
                      {form.formState.errors.nombre?.message}
		              </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ciudad"
                  value=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Ciudad
                      </FormLabel>
                      <FormControl>
                        <Input 
                        	{...field} 
	                        {...form.register("ciudad", {
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
                                const uppercase = e.target.value.toUpperCase()
                                field.onChange(uppercase)  
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
                  name="pais"
                  value=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        pais
                      </FormLabel>
                      <FormControl>
                        <Input 
                        	{...field} 
                        	{...form.register("pais", {
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
                                const uppercase = e.target.value.toUpperCase()
	                            field.onChange(uppercase)
	                         }} 
	                         className="bg-white" 
	                     />
                      </FormControl>
                      <FormMessage className="font-light text-red-600">
		              </FormMessage>
                    </FormItem>
                  )}
                />

                {
                  urlFotoB64 !== "" ? 
                  <div className="space-y-2">
                    <img className="w-32" src={urlFotoB64} />
                  </div>: ""
                }
                <FormField
                  control={form.control}
                  name="trazado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                      Cambiar Trazado
                      </FormLabel>
                      <FormControl>
                        <Input 
                            ref={inputFoto}
                        	type="file" 
                        	className="bg-white" 
                        	{...field} 
                        	{...form.register("trazado", {
					         })}
                        	onChange={(e) =>{ field.onChange(e)}} 
                        />
                      </FormControl>
                      <FormMessage className="font-light text-red-600">
		              </FormMessage>
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="numeroVueltas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                      Numero de vueltas
                      </FormLabel>
                      <FormControl>
	                      <Input 
	                      	type="number"
	                      	className="bg-white" 
	                      	{...field} 
	                      	{...form.register("numeroVueltas", {
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
                <FormField
                  control={form.control}
                  name="longitud"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                      Longitud
                      </FormLabel>
                      <FormControl>
                      	<Input
                      		type="number"
	                      	className="bg-white" 
	                      	{...field} 
	                      	{...form.register("longitud", {
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
                <FormField
                  control={form.control}
                  name="curvasLentas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                      Curvas lentas
                      </FormLabel>
                      <FormControl>
                        <Input
                        	type="number"
	                      	className="bg-white" 
	                      	{...field} 
	                      	{...form.register("curvasLentas", {
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
                <FormField
                  control={form.control}
                  name="curvasMedia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                      Curvas medias
                      </FormLabel>
                      <FormControl>
                        <Input
                        	type="number"
	                      	className="bg-white" 
	                      	{...field} 
	                      	{...form.register("curvasMedia", {
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
                <FormField
                  control={form.control}
                  name="curvasRapidas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                      Curvas rapidas
                      </FormLabel>
                      <FormControl>
                        <Input
                        	type="number"
	                      	className="bg-white" 
	                      	{...field} 
	                      	{...form.register("curvasRapidas", {
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
                <FormField
                  control={form.control}
                  name="fecha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                      Fecha
                      </FormLabel>
                      <FormControl>
                        <Input
                        	type="date"
	                      	className="bg-white" 
	                      	{...field} 
	                      	{...form.register("fecha", {
                          })}
	                      	onChange={(e) =>{ field.onChange(e)}} 
                        />
                      </FormControl>
                      <FormMessage className="font-light text-red-600">
		              </FormMessage>
                    </FormItem>
                  )}
                />
                <Button type="submit">Guardar</Button>
              </form>
            </Form>
        </div>
    )
}
 