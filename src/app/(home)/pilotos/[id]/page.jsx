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
import { Select } from "@/components/ui/select"
import ConstantsUtilInstance from "@/helpers/ConstansUtil"


const PilotoId = ({params}) => {
    const {
        form, handleSave, inputFoto, urlFotoB64
    } = usePilotoId( isNaN(parseInt(`${params.id}`)) ? 0 : parseInt(params.id) )
    
    return (
        <div className="container px-4 mx-auto md:px-6 lg:px-8">
            <TypographyH3 text={`${isNaN(parseInt(`${params.id}`)) ? 'Nuevo' : 'Editar'} piloto`} />
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
                <FormField
                  control={form.control}
                  name="pais"
                  render={({ field }) => (
                    <FormItem>
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
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
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
                {
                  urlFotoB64 !== "" ? 
                  <div className="space-y-2">
                    <img className="w-32" src={urlFotoB64} />
                  </div>: ""
                }
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black">Foto</label>
                  <input ref={inputFoto} className="flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white" aria-describedby=":Rfpuuujt6:-form-item-description" aria-invalid="false" name="foto" type="file" />
                </div>
                <Button type="submit">Guardar</Button>
              </form>
            </Form>
        </div>
    )
}
export default PilotoId