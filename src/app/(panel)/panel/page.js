import NextAuth from '@auth-kit/next';
import AdminPanel from './panels/AdminPanel';
import TeamLeadPanel from './panels/TeamLeadPanel';

export default function Panel() {
  const userRole = 'admin';

  return (
    <>
      <NextAuth fallbackPath={'/auth/signin'}>
        {userRole === 'admin' ? <AdminPanel /> : <TeamLeadPanel />}
      </NextAuth>
    </>
  );
}
