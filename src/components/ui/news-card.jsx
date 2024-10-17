import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function NewsCard({ title, description, href }) {
  return (
    <Card>
      <CardHeader>
        <Link href={href}>
          <CardTitle>{title}</CardTitle>
        </Link>
        <CardDescription>{description}</CardDescription>
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
