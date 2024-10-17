import NewsCard from '@/components/ui/news-card';
import { TypographyH1 } from '@/components/ui/typography';
import moment from 'moment';

export default function Blogs() {
  const mockNews = [
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
    {
      title: 'Noticia',
      description: moment().format('DD MMM YYYY'),
      href: '/blogs/',
    },
  ];

  return (
    <div className="w-full">
      <TypographyH1 text="Noticias" />
      <div className="mt-10">
        {mockNews.map(({ title, description, href }, i) => (
          <div className="mb-6">
            <NewsCard
              key={i}
              title={`${title} ${i + 1}`}
              href={`${href + i}`}
              description={description}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
