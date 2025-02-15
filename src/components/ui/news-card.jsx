import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default function NewsCard({ title, description, href }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
            {title}
          </Link>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
