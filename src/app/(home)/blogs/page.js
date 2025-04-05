"use client"; // Si estás usando NewsList

import NewsCard from '@/components/ui/news-card';
import { TypographyH1 } from '@/components/ui/typography';
import useNews from '@/hooks/news/useNews';
import moment from 'moment';

export default function Blogs() {
  const { news, loading, error } = useNews();

  if (loading) {
    return <div>Cargando noticias...</div>;
  }

  if (error) {
    return <div>Error al cargar las noticias: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <TypographyH1 text="Noticias" />
      <div className="mt-10">
        {news.map((newsItem) => (
          <div className="mb-6" key={newsItem.id}>
            <NewsCard
              title={newsItem.titulo}
              href={`/blogs/${newsItem.id}`}
              description={moment(newsItem.date).format('DD MMM YYYY')}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
