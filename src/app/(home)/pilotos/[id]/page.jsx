'use client'

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


const PilotoId = ({params}) => {
    const {
        form, handleSave
    } = usePilotoId( isNaN(parseInt(`${params.id}`)) ? 0 : parseInt(params.id) )
    
    return (
        <div className="container px-4 mx-auto md:px-6 lg:px-8">
            <TypographyH3 text={`${isNaN(parseInt(`${params.id}`)) ? 'Nuevo' : 'Editar'} piloto`} />
            <hr />
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSave)}
                className="space-y-8 py-5"
              >
                <FormField
                  control={form.control}
                  name="nombre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">Nombres</FormLabel>
                      <FormControl>
                        <Input className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage className="font-light text-red-600" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="apellidos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Apellidos
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
                  name="siglas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        Siglas
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
                  name="dorsal"
                  render={({ field }) => (
                    <FormItem>
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
                <Button type="submit">Guardar</Button>
              </form>
            </Form>
        </div>
    )
}
export default PilotoId