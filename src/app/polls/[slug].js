import { useRouter } from 'next/router';

export default function Poll() {
  const router = useRouter();
  return <div>Poll ID: {router.query.slug}</div>;
}
