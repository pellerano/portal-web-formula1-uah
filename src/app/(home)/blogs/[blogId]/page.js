'use client';

import moment from 'moment';
import { TypographyH1 } from '@/components/ui/typography';
import useNews from '@/hooks/news/useNews';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogDetail({ params }) {
  const { blogId: newsId } = params;
  const { loading, error, getNewsById } = useNews();
  const [newsItem, setBlog] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await getNewsById(newsId);
        if (fetchedBlog) {
          setBlog(fetchedBlog);
        } else {
          console.warn(`Blog with ID ${newsId} not found.`);
          router.push('/blogs');
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        router.push('/blogs');
      }
    };

    fetchBlog();

  }, [newsId, getNewsById, router]);

  if (loading) {
    return <div>Cargando noticia...</div>;
  }

  if (error) {
    return <div>Error al cargar la noticia: {error.message}</div>;
  }

  if (!newsItem) {
    return <div>Noticia no encontrada</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <TypographyH1 text={newsItem.titulo} />
      <p className="font-light">{moment(newsItem.date).format('LLL')}</p>
      <div className="w-1/2 mt-10 text-justify">
        <p>{newsItem.texto}</p>
      </div>
    </div>
  );
}
