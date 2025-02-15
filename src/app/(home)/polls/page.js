'use client';

import NewsCard from '@/components/ui/news-card';
import { TypographyH1 } from '@/components/ui/typography';
import moment from 'moment';
import FetchApiServiceInstance from '@/helpers/FetchApiUtil';
import { useState, useEffect } from 'react';

export default function Polls() {
  const [listDataVotacion, setListDataVotacion] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const votacionData = await FetchApiServiceInstance.getAll(
          `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/votacion`,
          null,
          (err) => {
            console.log('error custom');
          }
        );
        setListDataVotacion(votacionData);
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log("Data received:", listDataVotacion);

  return (
    <div className="w-full">
      <TypographyH1 text="Votaciones" />
      <div className="mt-10">
        {listDataVotacion.map((votacion, i) => (
          <div className="mb-6" key={i}>
            <NewsCard
              title={votacion.titulo || `Votación ${i + 1}`}
              href={`/polls/${votacion.id || i}`}
              description={moment(votacion.fechaCreacion).format('DD MMM YYYY') || moment().format('DD MMM YYYY')}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
