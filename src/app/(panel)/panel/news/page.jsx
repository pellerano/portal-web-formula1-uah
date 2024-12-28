'use client';
import * as React from "react";
import { NewsTable } from "@/components/ui/news-table";
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import { useContext, useEffect } from 'react';


export default function NewsListPage() {
  const { setBreadcrumbs } = useContext(Sidebar8Context);
    useEffect(() => {
        setBreadcrumbs(['Gestion de Noticias']);
      }, []);
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8087/portalWebFormula1/noticias');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error al cargar datos: {error.message}</p>;
  }

  return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
            {news.length > 0 ? (
              <NewsTable data={news} />
            ) : (
              <p>No movies available</p>
            )}
          </div>
        </div>
  );
}
