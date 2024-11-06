'use client';
import { useContext, useEffect } from 'react';
import { Sidebar8Context } from '@/components/ui/sidebar-08';

export default function PanelNewsPage() {
  const { setBreadcrumbs } = useContext(Sidebar8Context);

  useEffect(() => {
    setBreadcrumbs(['Gestión de Votaciones']);
  }, []);

  return <div>Gestión de Noticias</div>;
}
