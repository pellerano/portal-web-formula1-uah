import { useState } from 'react';
import { Select } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

import useResponsableId from "@/hooks/responsable/useResponsableId"
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


const EditResponsable = ({ dataId, eMSeg, fnUpdate }) => {
  const {
    form, handleSave
  } = useResponsableId( isNaN(parseInt(`${dataId}`)) ? 0 : parseInt(dataId), eMSeg )

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  return (
      <div className="container px-4 mx-auto md:px-6 lg:px-8">
        <TypographyH3 text={parseInt(dataId)===0?'Nuevo Responsable':'Editar Responsable'}/>
            <hr />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSave)}
                className="space-y-8 py-5"
                encType="multipart/form-data"
              >

                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-black">Usuario</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage className="font-light text-red-600" />
                      </FormItem>
                    )}
                  />

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
                    name="email"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-black">Email</FormLabel>
                        <FormControl>
                          <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage className="font-light text-red-600" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel className="text-black">Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage className="font-light text-red-600" />
                      </FormItem>
                    )}
                  />
                  
               
                <Button type="submit">Guardar</Button>
              </form>
            </Form>
        </div>
  );
};
export default EditResponsable;
