import { Base } from './base';
import { DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Edit, Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useState } from 'react';
import useUser from '@/hooks/usuario/useUser';
import { Select } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message:
        'Este campo tiene un mínimo de 2 caracteres y debe ser completado.',
    })
    .max(50, {
      message: 'Este campo tiene un máximo de 50 caracteres.',
    }),
  username: z
    .string()
    .min(2, {
      message:
        'Este campo tiene un mínimo de 2 caracteres y debe ser completado.',
    })
    .max(50, {
      message: 'Este campo tiene un máximo de 50 caracteres.',
    }),
  role: z
    .string()
    .min(2, {
      message:
        'Este campo tiene un mínimo de 2 caracteres y debe ser completado.',
    })
    .max(50, {
      message: 'Este campo tiene un máximo de 50 caracteres.',
    }),
  status: z
    .string()
    .min(2, {
      message:
        'Este campo tiene un mínimo de 2 caracteres y debe ser completado.',
    })
    .max(50, {
      message: 'Este campo tiene un máximo de 50 caracteres.',
    }),
  email: z
    .string()
    .min(1, { message: 'Este campo debe ser completado.' })
    .email('Este no es un correo electrónico válido.'),
});

const EditUser = ({ user, roles, updateUser }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.nombre,
      username: user.username,
      email: user.email,
      role: user.rol,
      status: user.estado,
    },
  });

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
    <Base
      title={'Editar Usuario'}
      trigger={
        <DialogTrigger asChild>
          <Button variant="primary" size="icon">
            <Edit />
          </Button>
        </DialogTrigger>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="name" readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de Usuario</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="username" readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input {...field} autoComplete="email" readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select
                    className="bg-white"
                    {...field}
                    name="role"
                    options={roles.map((role) => ({
                      value: role.name,
                      text: role.name,
                    }))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select
                    className="bg-white"
                    {...field}
                    name="role"
                    options={[
                      { value: 'Aprobado', text: 'Aprobado' },
                      { value: 'Pendiente', text: 'Pendiente' },
                      { value: 'Rechazado', text: 'Rechazado' },
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="mt-6" type="submit">
            {loading && <Loader2 className="animate-spin" />}
            Guardar Cambios
          </Button>
        </form>
      </Form>
    </Base>
  );
};
export default EditUser;
