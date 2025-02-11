'use client';
import NextAuth from '@auth-kit/next';
import AdminPanel from './panels/AdminPanel';
import TeamLeadPanel from './panels/TeamLeadPanel';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useRouter } from 'next/navigation';

const panelAllowedRoles = ['Administrador', 'Equipo'];

export default function Panel() {
  const user = useAuthUser();
  const router = useRouter();

  if (!panelAllowedRoles.includes(user.role.name)) router.push('/');
  return (
    <>
      <NextAuth fallbackPath={'/auth/signin'}>
        {user.role.name === 'Administrador' ? (
          <AdminPanel />
        ) : (
          <TeamLeadPanel />
        )}
      </NextAuth>
    </>
  );
}
