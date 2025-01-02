'use client'
import saveNewCircuit from '@/hooks/circuito/useNewCircuito';
import { React, useContext, useEffect } from 'react';
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


export default function NewCircuits({
    funcionCloseDialog, 
    funcionOpenLoading,
    funcionCloseLoading}) {
  const { setBreadcrumbs } = useContext(Sidebar8Context);
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
   
  useEffect(() => {
    setBreadcrumbs(['Gestión de Circuitos']);
  }, []);
   
  const handleSave = async (data) => {
    funcionCloseDialog();  
    funcionOpenLoading();
  
    const success = await saveNewCircuit(data);

    setTimeout(() => {
        console.log("¡Ha pasado un segundo!");
        funcionCloseLoading();
        window.location.href="/panel/circuits";
    }, 1000);
  }

  return (
        <div className="container px-4 mx-auto md:px-6 lg:px-8">
            <TypographyH3 text={'Nuevo Circuito'}/>
            <hr />
            <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSave)}
                className="space-y-8 py-5"
                encType="multipart/form-data"
              >
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
                <FormField
                  control={form.control}
                  name="trazado"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                      Trazado
                      </FormLabel>
                      <FormControl>
                        <Input 
                        	type="file" 
                        	className="bg-white" 
                        	{...field} 
                        	{...form.register("trazado", {
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
                <Button type="submit">Guardar</Button>
              </form>
            </Form>
        </div>
    )
}
 