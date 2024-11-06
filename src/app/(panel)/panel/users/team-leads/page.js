'use client';
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import { useContext, useEffect } from 'react';

export default function PanelUsersTeamLeadsPage() {
  const { setBreadcrumbs } = useContext(Sidebar8Context);

  useEffect(() => {
    setBreadcrumbs(['Gestión de Usuarios', 'Lideres de Equipo']);
  }, []);
  return <div>Gestión de Usuarios - Lideres de Equipo</div>;
}
