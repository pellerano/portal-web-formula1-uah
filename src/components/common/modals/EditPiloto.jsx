import { useState } from 'react';
import { Select } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

import usePilotoId from "@/hooks/piloto/usePilotoId"
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
import ConstantsUtilInstance from "@/helpers/ConstansUtil"


const EditPiloto = ({ dataId, eMSeg, fnUpdate }) => {
  const {
    form, handleSave, inputFoto, urlFotoB64, getSigla
  } = usePilotoId( isNaN(parseInt(`${dataId}`)) ? 0 : parseInt(dataId), eMSeg )

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (values) => {
    const data = {
      ...values,
      ...user,
      id: user.id,
      estado: values.status,
      idRol: roles.find((x) => x.name === values.role).id,
      rol: values.role,
    };
    try {
      setLoading(true);
      await updateUser(data).finally(() => {
        setLoading(false);
        toast({
          title: 'Cambios guardados con exito!',
        });
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    // <Base
    //   title={parseInt(dataId)===0?'Nuevo Piloto':'Editar Piloto'}
    //   trigger={
    //     <DialogTrigger asChild>
    //       <Button variant={parseInt(dataId)===0?"default":"primary"}>
    //         {
    //           parseInt(dataId)===0?"Nuevo":<Edit />
    //         }
    //       </Button>
    //     </DialogTrigger>
    //   }
    //   classNameCustom={"sm:max-w-[850px]"}
    // >
      <div className="container px-4 mx-auto md:px-6 lg:px-8">
        <TypographyH3 text={parseInt(dataId)===0?'Nuevo Piloto':'Editar Piloto'}/>
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
                      <FormItem className="">
                        <FormLabel className="text-black">Nombres</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage className="font-light text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="apellidos"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-black">
                          Apellidos
                        </FormLabel>
                        <FormControl>
                          <Input {...field} onChange={(e) =>{
                            field.onChange(e)
                            getSigla()
                          }} className="bg-white" />
                        </FormControl>
                        <FormMessage className="font-light text-red-600" />
                      </FormItem>
                    )}
                  />
               
                  <FormField
                    control={form.control}
                    name="siglas"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-black">
                          Siglas
                        </FormLabel>
                        <FormControl>
                          <Input className="bg-white" {...field} onChange={(e) =>{
                            field.onChange(e)
                            const { siglas } = form.getValues()
                            if(siglas.trim() !== ""){form.setValue("siglas", siglas.toUpperCase())}
                          }} />
                        </FormControl>
                        <FormMessage className="font-light text-red-600" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dorsal"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-black">
                        Dorsal
                        </FormLabel>
                        <FormControl>
                          <Input className="bg-white" {...field} />
                        </FormControl>
                        <FormMessage className="font-light text-red-600" />
                      </FormItem>
                    )}
                  />
                

                
                <FormField
                  control={form.control}
                  name="pais"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-black">
                      Pais
                      </FormLabel>
                      <FormControl>
                        <Select className="bg-white" {...field} name="pais" options={ConstantsUtilInstance.getPaises()} />
                      </FormControl>
                      <FormMessage className="font-light text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="text-black">
                      Estado
                      </FormLabel>
                      <FormControl>
                        <Select className="bg-white" {...field} name="estado" options={ConstantsUtilInstance.getEstados()} />
                      </FormControl>
                      <FormMessage className="font-light text-red-600" />
                    </FormItem>
                  )}
                />
                


                
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-black">
                        Twitter
                        </FormLabel>
                        <FormControl>
                          <Input className="bg-white" {...field} />
                        </FormControl>
                        <FormMessage className="font-light text-red-600" />
                      </FormItem>
                    )}
                  />
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black">Foto</label>
                      <input ref={inputFoto} className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white" aria-describedby=":Rfpuuujt6:-form-item-description" aria-invalid="false" name="foto" type="file" />
                    </div>
                

                
                    {
                      urlFotoB64 !== "" ? 
                      <><div className="">
                      <img className="size-32" src={urlFotoB64} />
                    </div></>: ""
                    }
               
                <Button type="submit">Guardar</Button>
              </form>
            </Form>
        </div>
    // </Base>
  );
};
export default EditPiloto;
