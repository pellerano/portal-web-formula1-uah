import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function PilotoCard({ title, description, href, dataFotoB64, siglas, dorsal, pais }) {
  return (
    <Card>
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
              <p><span className='font-bold text-gray-600'>Siglas: </span>{siglas}</p>
              <p><span className='font-bold text-gray-600'>Dorsal: </span>{dorsal}</p>
              <p><span className='font-bold text-gray-600'>País: </span>{pais}</p>
            </CardDescription>
          </div>
        </div>
        
      </CardHeader>
      {/* <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}
