'use client';
import * as React from 'react';
import { NewsTable } from '@/components/ui/news-table';
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import { useContext, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function NewsListPage() {
  const { setBreadcrumbs } = useContext(Sidebar8Context);
  useEffect(() => {
    setBreadcrumbs(['Gestion de Noticias']);
  }, []);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [permalink, setPermalink] = useState('');
  const [imagen, setImagen] = useState('');
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/noticias`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
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

  const handleSaveNews = async () => {
    // if (!permalink || !titulo || !texto) {
    //   alert('Todos los campos son requeridos');
    //   return;
    // }
    const createNews = {
      permalink,
      titulo,
      imagen: null,
      texto,
      date: new Date().toISOString(),
    };

    console.log(JSON.stringify(createNews));

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createNews),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsSheetOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error al guardar los la noticia:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>Error al cargar datos: {error.message}</p>;
  }

  return (
    <div className="flex flex-col flex-1 gap-4 p-4 pt-0">
      <div className="flex items-center justify-end">
        <Button onClick={() => setIsSheetOpen(true)}>Nueva Noticia</Button>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        {news.length > 0 ? (
          <NewsTable data={news} />
        ) : (
          <p>No movies available</p>
        )}
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Nueva Noticia</SheetTitle>
            <SheetDescription>
              Añade una nueva noticia a la lista
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="permalink" className="text-right">
                Permalink
              </Label>
              <Input
                id="permalink"
                className="col-span-3"
                onChange={(event) => setPermalink(event.target.value)}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="titulo" className="text-right">
                Titulo
              </Label>
              <Input
                id="titulo"
                className="col-span-3"
                onChange={(event) => setTitulo(event.target.value)}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="texto" className="text-right">
                Descripcion
              </Label>
              <textarea
                id="texto"
                className="w-full h-64 col-span-3 p-2 border rounded"
                onChange={(event) => setTexto(event.target.value)}
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={handleSaveNews}>
                {' '}
                Guardar Noticia{' '}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
