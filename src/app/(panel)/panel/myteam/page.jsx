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
        form, handleSave, inputFoto, urlFotoB64, goTwitter
    } = useMyTeam(0)

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
                        <div className="flex rounded-lg shadow-sm">
                          <div className="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 dark:bg-neutral-700 dark:border-neutral-600">
                            <span className="text-sm text-gray-500 dark:text-neutral-400">@</span>
                          </div>
                          <Input className="bg-white shadow-sm rounded-r-none rounded-l-none" {...field} />
                          <Button onClick={goTwitter} type="button" variant="link" className="bg-blue-600 text-white rounded-l-none">Ir</Button>
                        </div>
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