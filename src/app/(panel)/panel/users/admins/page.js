'use client';
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import { useContext, useEffect } from 'react';

export default function PanelUsersAdminsPage() {
  const { setBreadcrumbs } = useContext(Sidebar8Context);

  useEffect(() => {
    setBreadcrumbs(['Gestión de Usuarios', 'Administradores']);
  }, []);

  return <div>Gestión de Usuarios - Administradores</div>;
}
