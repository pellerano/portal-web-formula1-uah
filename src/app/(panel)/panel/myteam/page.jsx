'use client'
import useMyTeam from "@/hooks/myteam/useMyTeam"
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
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import { useContext, useEffect } from 'react';


const PanelMyTeamPage = ({params}) => {
    const { setBreadcrumbs } = useContext(Sidebar8Context);
    const {
        form, handleSave, inputFoto, urlFotoB64, getSigla
    } = useMyTeam(1)

    useEffect(() => {
        setBreadcrumbs(['Mi equipo']);
      }, []);
    
    return (
        <div className="container px-4 mx-auto md:px-6 lg:px-8">
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
                      <FormLabel className="text-black">Nombre</FormLabel>
                      <FormControl>
                        <Input {...field} className="bg-white" />
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
export default PanelMyTeamPage