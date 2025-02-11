'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TypographyH1, TypographyH2 } from '@/components/ui/typography';
import { TypographyH3 } from '@/components/ui/typographyH3';
import { useEffect, useMemo, useState } from 'react';
import { es } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import useCircuito from '@/hooks/circuito/useCircuito';

const dummyData = [
  {
    id: 1,
    nombre: 'Circuit de Monaco',
    ciudad: 'Monaco',
    pais: 'Monaco',
    trazado: null,
    numeroVueltas: 78,
    longitud: 3.337,
    curvasLentas: 6,
    curvasMedia: 10,
    curvasRapidas: 4,
    fecha: '2025-01-03',
  },
  {
    id: 2,
    nombre: 'Silverstone Circuit',
    ciudad: 'Silverstone',
    pais: 'UK',
    trazado: null,
    numeroVueltas: 52,
    longitud: 5.891,
    curvasLentas: 8,
    curvasMedia: 10,
    curvasRapidas: 6,
    fecha: '2025-01-03',
  },
  {
    id: 3,
    nombre: 'Circuit de Spa-Francorchamps',
    ciudad: 'Stavelot',
    pais: 'Belgium',
    trazado: null,
    numeroVueltas: 44,
    longitud: 7.004,
    curvasLentas: 9,
    curvasMedia: 10,
    curvasRapidas: 5,
    fecha: '2024-12-03',
  },
  {
    id: 4,
    nombre: 'Suzuka Circuit',
    ciudad: 'Suzuka',
    pais: 'Japan',
    trazado: null,
    numeroVueltas: 53,
    longitud: 5.807,
    curvasLentas: 7,
    curvasMedia: 11,
    curvasRapidas: 6,
    fecha: null,
  },
  {
    id: 5,
    nombre: 'Circuit of the Americas',
    ciudad: 'Austin',
    pais: 'USA',
    trazado: null,
    numeroVueltas: 56,
    longitud: 5.513,
    curvasLentas: 8,
    curvasMedia: 9,
    curvasRapidas: 7,
    fecha: null,
  },
];

const getMonth = (index) => {
  const months = {
    0: 'Enero',
    1: 'Febrero',
    2: 'Marzo',
    3: 'Abril',
    4: 'Mayo',
    5: 'Junio',
    6: 'Julio',
    7: 'Agosto',
    8: 'Septiembre',
    9: 'Octubre',
    10: 'Noviembre',
    11: 'Diciembre',
  };
  return months[index];
};

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const { listData } = useCircuito();

  const selectedDateData = useMemo(() => {
    const filteredData = data.filter((x) => x.date === `${date}`);
    return filteredData;
  }, [date]);

  useEffect(() => {
    if (listData.length) {
      const formattedData = listData.map((x) => {
        const date = new Date(x.fecha);
        date.setHours(0, 0, 0, 0);
        return { ...x, date: `${date}` };
      });
      setData(formattedData);
    }
  }, [listData]);

  return (
    <div className="w-full h-full p-10 overflow-hidden bg-red-700">
      <div className="text-white">
        <TypographyH1 text="Calendario" />
      </div>
      <Card className="w-full p-10 mt-4">
        <div className="flex gap-2">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
              locale={es}
            />
          </div>
          <Separator orientation="vertical" className="bg-red-700 h-4/5" />
          <div className="w-full p-4">
            <TypographyH2 text="Resultados" />
            {!!selectedDateData.length ? (
              <div>
                <div className="mt-4">
                  {selectedDateData.map((result) => (
                    <Result result={result} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-4 text-center">
                No hay datos disponibles para esta fecha.
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

const Result = ({ result }) => {
  const {
    id,
    nombre,
    ciudad,
    pais,
    trazado,
    numeroVueltas,
    longitud,
    curvasLentas,
    curvasMedia,
    curvasRapidas,
    fecha,
  } = result;

  const { day, month } = useMemo(() => {
    const [year, month, day] = fecha.split('-');
    return { day, month, year };
  }, [fecha]);

  return (
    <Card className="p-6 mb-4">
      <div className="flex gap-2">
        <div>
          <TypographyH3 text={day} />
          <p className="text-red-700">
            {getMonth(parseInt(month) - 1)
              .substring(0, 3)
              .toUpperCase()}
          </p>
        </div>
        <Separator orientation="vertical" className="h-4/5" />
        <div className="flex">
          <div>
            <TypographyH3 text={nombre} />
            <p className="text-gray-800">{`${ciudad}, ${pais}`}</p>
          </div>
          <div></div>
        </div>
      </div>
    </Card>
  );
};

export default CalendarPage;
