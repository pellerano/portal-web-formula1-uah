'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RadioGroup } from '@/components/ui/radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Chart } from '@/components/common/bar-chart';
import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { useToast } from '@/hooks/use-toast';

// Define the schema for your form
const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor, introduce un email válido.",
  }),
  vote: z.object({
    pilotoId: z.string({
      required_error: "Por favor, selecciona un piloto.",
    }),
  }),
});

const Option = ({ option, isSelected, select }) => {
  const { nombre, equipo, id } = option || {};
  const handleClick = (event) => {
    event.stopPropagation();
    select(String(id));
  };

  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem
          className="hidden"
          checked={isSelected}
          value={String(id)}
          id={`pilot-${id}`}
        />
      </FormControl>
      <div
        className={`w-full p-3 rounded cursor-pointer drop-shadow-md ${
          isSelected
            ? 'bg-red-900 text-white outline outline-offset-2 outline-2'
            : 'bg-white hover:bg-gray-100'
        } ${isSelected ? 'ring-2 ring-red-500' : ''}`}
        onClick={handleClick}
      >
        <h1 className="text-xl font-bold">{nombre}</h1>
        <p>{equipo}</p>
      </div>
    </FormItem>
  );
};

export default function Poll({ params }) {
  const [options, setOptions] = useState([]);
  const [votacion, setVotacion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      vote: { pilotoId: "" },
    },
  });

  useEffect(() => {
    console.log("Form Values:", form.getValues());
    console.log("Form Errors:", form.formState.errors);
    console.log("Is Submitting:", form.formState.isSubmitting);
    console.log("Is Valid:", form.formState.isValid);
  }, [form.watch(), form.formState]);

  async function onSubmit(values) {
    console.log("onSubmit called");
    console.log('Form values:', values);
  
    try {
      const voteData = {
        votacionId: params.pollId,
        nombrePublico: values.name,
        email: values.email,
        pilotoId: values.vote.pilotoId,
      };
      console.log("Data being sent to API:", voteData);
  
      const response = await fetch( // se usa fetch directo no pasa por el servicio
        `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/votaciones`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(voteData),
        }
      );
  
      if (response.ok) {
        const text = await response.text();
        console.log('Votación enviada con éxito:', text);
        toast({
          title: 'Votación enviada',
          description: '¡Gracias por votar!',
          status: 'success',
        });
  
        form.reset();
        fetchPollData();
      } else {
        // Handle the error case
        const errorText = await response.text();
        console.error('Error al enviar la votación:', errorText);
        toast({
          title: 'Error al enviar la votación',
          description: 'Por favor, intenta de nuevo más tarde.',
          status: 'error',
          variant: 'destructive',
        });
  
      }
    } catch (error) {
      console.error('Error al enviar la votación:', error);
      // toast({
      //   title: 'Error al enviar la votación',
      //   description: error.message,
      //   status: 'error',
      //   variant: 'destructive',
      // });
    }
  }

  const fetchPollData = async () => {
    try {
      const response = await FetchApiServiceInstance.getById(
        `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/votaciones/${params.pollId}`,
        null,
        (err) => {
          console.error('Error al obtener los datos de la votación:', err);
        }
      );

      if (response) {
        console.log('Datos de la votación obtenidos:', response);
        setVotacion({
          titulo: response.title,
          limite: response.endDate,
          id: response.id,
        });
        // Mapeamos las opciones de la votación
        setOptions(response.options.map(option => ({
          id: option.id,
          nombre: option.name,
          equipo: option.team,
          votos: option.votes,
        })));
      } else {
        console.error('Error al obtener los datos de la votación: Response is undefined');
      }
    } catch (error) {
      console.error('Error al obtener los datos de la votación:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPollData();
  }, [params.pollId]);

  const chartData = options.map((option) => ({
    name: option?.nombre || "Unknown",
    team: option?.equipo || "Unknown",
    votes: option?.votos || 0,
  }));

  if (isLoading) {
    return <div>Cargando votación...</div>;
  }

  if (!votacion) {
    return <div>Error: No se pudo cargar la votación.</div>;
  }

  const handleSelect = (value) => {
    form.setValue('vote.pilotoId', value);
  };

  return (
    <div className="w-full px-4 py-8 mx-auto md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-red-700">{votacion.titulo}</h1>
      <p className="font-light">
        Fecha Limite: {moment(votacion.limite).calendar()}
      </p>
      <div className="flex justify-center my-8"></div>
      <div className="flex mt-6">
        <div className="w-1/2 p-10 ml-4 ">
          <h1 className="mb-4 font-light text-md">Resultados</h1>
          <Chart
            title="Resultados"
            axisDataKey="name"
            barDataKey="votes"
            chartData={chartData}
            chartConfig={{
              votes: {
                label: 'Votos',
                color: 'hsl(0 73.7 41.8)',
              },
            }}
          />
        </div>
        <div className="w-1/2">
          <div className="p-10 bg-red-700 rounded drop-shadow-lg space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nombre</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu Nombre"
                          {...field}
                          className="text-white bg-transparent border-white"
                        />
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
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tu Email"
                          type="email"
                          {...field}
                          className="text-white bg-transparent border-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vote.pilotoId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Piloto</FormLabel>
                        <RadioGroup onValueChange={handleSelect} defaultValue={field.value} className="flex flex-col space-y-1">
                          {options.map((option) => (
                            <Option
                              key={option.id}
                              option={option}
                              isSelected={form.watch('vote.pilotoId') === String(option.id)}
                              select={handleSelect}
                            />
                          ))}
                        </RadioGroup>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Votar</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}