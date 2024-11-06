'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
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

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Este campo debe ser completado.' })
    .max(50),
  email: z
    .string()
    .min(1, { message: 'Este campo debe ser completado.' })
    .email('Este no es un correo electrónico válido.'),
  vote: z.object({
    name: z.string().min(1),
    team: z.string().min(1),
    id: z.string().uuid(),
  }),
});

const dummyData = {
  options: [
    {
      name: 'Piloto 1',
      team: 'Equipo 1',
      votes: 186,
    },
    {
      name: 'Piloto 2',
      team: 'Equipo 2',
      votes: 305,
    },
    {
      name: 'Piloto 3',
      team: 'Equipo 3',
      votes: 237,
    },
    {
      name: 'Piloto 4',
      team: 'Equipo 4',
      votes: 73,
    },
  ],
};

export default function Poll({ params }) {
  const [selected, select] = useState(null);
  const [options, setOptions] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      vote: {},
    },
  });

  function onSubmit(values) {
    console.log(values);
  }

  useEffect(() => {
    const parsedData = dummyData.options.map((opt) => ({
      ...opt,
      id: uuidv4(),
    }));
    setOptions(parsedData);
  }, []);

  return (
    <div className="w-full px-4 py-8 mx-auto md:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-red-700">{params.pollId}</h1>
      <p className="font-light">
        Fecha Limite: {moment().add(10, 'days').calendar()}
      </p>
      <div className="flex justify-center my-8"></div>
      <div className="flex mt-6">
        <div className="w-1/2 p-10 ml-4 ">
          <h1 className="mb-4 font-light text-md"></h1>
          <Chart
            title="Resultados"
            axisDataKey="name"
            barDataKey="votes"
            chartData={dummyData.options}
            chartConfig={{
              votes: {
                label: 'Votos',
                color: 'hsl(0 73.7 41.8)',
              },
            }}
          />
        </div>
        <div className="w-1/2">
          <div className="p-10 bg-red-700 rounded drop-shadow-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Nombre</FormLabel>
                      <FormControl>
                        <Input className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage className="font-light text-white" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">
                        Correo Electronico
                      </FormLabel>
                      <FormControl>
                        <Input className="bg-white" {...field} />
                      </FormControl>
                      <FormMessage className="font-light text-white" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vote"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel className="text-white">
                        Seleccione una opción:
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {options.map((opt) => (
                            <Option
                              key={uuidv4()}
                              option={opt}
                              isSelected={selected?.id === opt.id}
                              formOnChange={field.onChange}
                              handleSelect={select}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">ENVIAR</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

const Option = ({ option, img, isSelected, formOnChange, handleSelect }) => {
  const { name, team, id } = option;

  return (
    <FormItem className="flex items-center space-x-3 space-y-0">
      <FormControl>
        <RadioGroupItem className="hidden" checked={isSelected} value={id} />
      </FormControl>
      <div
        className={`w-full p-3 rounded cursor-pointer drop-shadow-md  ${
          isSelected
            ? 'bg-red-700 text-white outline outline-offset-2 outline-2'
            : `bg-white hover:bg-gray-100`
        }`}
        onClick={() => {
          formOnChange(option);
          handleSelect(option);
        }}
      >
        <h1 className="text-xl font-bold">{name}</h1>
        <p>{team}</p>
      </div>
    </FormItem>
  );
};
