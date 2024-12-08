import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function PilotoCard({ title, description, href, dataFotoB64, siglas, dorsal, pais, estado }) {
  return (
    <Card className={ estado == "0" ?"border-red-500":"" }>
      <CardHeader>
        <div className='flex'>
          <div className='mr-4'>
            <img className="w-16" src={dataFotoB64} />
          </div>
          <div>
            <Link href={href}>
              <CardTitle>{title}</CardTitle>
            </Link>
            <CardDescription>
              <span className='font-bold text-gray-600'>Siglas: </span>{siglas}
            </CardDescription>
            <CardDescription>
              <span className='font-bold text-gray-600'>Dorsal: </span>{dorsal}
            </CardDescription>
            <CardDescription>
              <span className='font-bold text-gray-600'>País: </span>{pais}
            </CardDescription>
          </div>
        </div>
        
      </CardHeader>
    </Card>
  );
}
