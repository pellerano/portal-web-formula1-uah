'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message:
          'Este campo tiene un mínimo de 2 caracteres y debe ser completado.',
      })
      .max(50, {
        message: 'Este campo tiene un máximo de 50 caracteres.',
      }),
    lastName: z
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
    email: z
      .string()
      .min(1, { message: 'Este campo debe ser completado.' })
      .email('Este no es un correo electrónico válido.'),
    password: z
      .string()
      .min(8, {
        message:
          'Este campo tiene un mínimo de 8 caracteres y un máximo de 24 caracteres.',
      })
      .max(24),
    confirmPassword: z
      .string()
      .min(8, {
        message:
          'Este campo tiene un mínimo de 8 caracteres y un máximo de 24 caracteres.',
      })
      .max(24),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Las contraseñas no coinciden.',
        path: ['confirmPassword'],
      });
    }
  });

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values) {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            nombre: `${values.firstName} ${values.lastName}`,
            ...values,
          }),
        }
      );
      if (res.status != 200) throw new Error(res.code);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regístrate</CardTitle>
        <CardDescription>
          Puedes completar tu registro con el siguiente formulario. Una vez
          enviada la solicitud, deberás esperar a que el Administrador habilite
          tu acceso.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="firstName" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input {...field} autoComplete="last-name" />
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
                    <Input {...field} autoComplete="username" />
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
                    <Input {...field} autoComplete="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        className="pr-10 hide-password-toggle"
                        autoComplete="password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeIcon className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="pr-10 hide-password-toggle"
                        autoComplete="confirm-password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <EyeIcon className="w-4 h-4" aria-hidden="true" />
                        ) : (
                          <EyeOffIcon className="w-4 h-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showConfirmPassword
                            ? 'Hide password'
                            : 'Show password'}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} className="mt-3" type="submit">
              {loading && <Loader2 className="animate-spin" />}
              Regístrate
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
