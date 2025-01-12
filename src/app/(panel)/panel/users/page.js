'use client';

import DeleteUser from '@/components/common/modals/DeleteUser';
import EditUser from '@/components/common/modals/EditUser';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sidebar8Context } from '@/components/ui/sidebar-08';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useUser from '@/hooks/usuario/useUser';
import { useContext, useEffect, useState } from 'react';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

export default function PanelUsersPage() {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const { setBreadcrumbs } = useContext(Sidebar8Context);
  const { users, roles, updateUser } = useUser();
  const currentUser = useAuthUser();

  const filter = (e) => {
    const value = e.target.value.toLowerCase();
    const data = filteredUsers.length ? filteredUsers : users;
    if (!value) {
      setFilteredUsers([]);
    } else {
      const filtered = data.filter(
        (x) =>
          x.nombre.toLowerCase().includes(value) ||
          x.email.toLowerCase().includes(value) ||
          x.username.toLowerCase().includes(value)
      );
      setFilteredUsers(filtered);
    }
  };

  const filterByRole = () => {
    if (roleFilter === 'all') {
      setFilteredUsers([]);
    } else {
      const filtered = [...users].filter((x) => x.rol === roleFilter);
      setFilteredUsers(filtered);
    }
  };

  const filterByStatus = () => {
    if (statusFilter === 'all') {
      setFilteredUsers([]);
    } else {
      const filtered = [...users].filter((x) => x.estado === statusFilter);
      setFilteredUsers(filtered);
    }
  };

  useEffect(() => {
    setBreadcrumbs(['Gestión de Usuarios', 'Solicitudes']);
  }, [setBreadcrumbs]);

  useEffect(() => {
    filterByRole();
  }, [roleFilter]);

  useEffect(() => {
    filterByStatus();
  }, [statusFilter]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const renderTableRows = (usersToRender) => {
    return usersToRender.map((user, key) => {
      if (user.id !== currentUser?.id) {
        return (
          <TableRow key={key}>
            <TableCell className="font-medium">{user.nombre}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.rol}</TableCell>
            <TableCell>
              <Badge
                className={`${
                  user.estado === 'Aprobado'
                    ? 'bg-green-700'
                    : user.estado === 'Pendiente'
                    ? 'bg-amber-400'
                    : ''
                }`}
                variant={`${user.estado === 'Rechazado' ? 'destructive' : ''}`}
              >
                {user.estado}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <EditUser user={user} roles={roles} updateUser={updateUser} />
                <DeleteUser user={user} />
              </div>
            </TableCell>
          </TableRow>
        );
      }
    });
  };

  return (
    <div className="p-10 pt-3">
      <h1 className="mb-6 text-6xl font-bold">Solicitudes</h1>
      <div className="flex items-center justify-between mb-6">
        <div className="w-1/3">
          <Input onChange={filter} className="p-4 py-6" placeholder="Buscar" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filtrar</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtrar por Rol</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={roleFilter}
              onValueChange={setRoleFilter}
            >
              {['all', 'Invitado', 'Administrador', 'Equipo'].map((role) => (
                <DropdownMenuRadioItem
                  key={role}
                  value={role}
                  className={roleFilter === role ? 'font-bold' : ''}
                >
                  {role === 'all' ? 'Todos' : role}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filtrar por Estado</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              {['all', 'Aprobado', 'Pendiente', 'Rechazado'].map((status) => (
                <DropdownMenuRadioItem
                  key={status}
                  value={status}
                  className={statusFilter === status ? 'font-bold' : ''}
                >
                  {status === 'all' ? 'Todos' : status}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card className="p-4">
        <ScrollArea className="h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Correo Electrónico</TableHead>
                <TableHead>Usuario</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length
                ? renderTableRows(filteredUsers)
                : renderTableRows(users)}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>
    </div>
  );
}
