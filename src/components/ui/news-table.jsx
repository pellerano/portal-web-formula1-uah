'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useEffect } from 'react';

export const columns = (handleEdit, handleDelete) => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'titulo',
    header: 'Titulo',
    cell: ({ row }) => <div>{row.getValue('titulo')}</div>,
  },
  {
    accessorKey: 'texto',
    header: 'Descripcion',
    cell: ({ row }) => <div>{row.getValue('texto')}</div>,
  },
  {
    accessorKey: 'permalink',
    header: 'Permalink',
    cell: ({ row }) => <div>{row.getValue('permalink')}</div>,
  },
  {
    accessorKey: 'imagen',
    header: 'Imagen',
    cell: ({ row }) => <div>{row.getValue('imagen')}</div>,
  },
  {
    id: 'acciones',
    header: 'Acciones',
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleEdit(row.original.id)}
        >
          Editar
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente
                la noticia con el ID: {row.original.id}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(row.original.id)}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    ),
  },
];

export function NewsTable({ data }) {
  const [news, setNews] = useState(data);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [titulo, setTitulo] = useState(
    news.find((n) => n.id === editId)?.titulo || ''
  );
  const [texto, setTexto] = useState(
    news.find((n) => n.id === editId)?.texto || ''
  );

  useEffect(() => {
    const newItem = news.find((n) => n.id === editId);
    if (newItem) {
      setTitulo(newItem.titulo);
      setTexto(newItem.texto);
    }
  }, [editId]);

  const handleEdit = (id) => {
    setEditId(id);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/noticias/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNews((prevNews) => prevNews.filter((news) => news.id !== id));
    } catch (error) {
      console.error('Error al eliminar la noticia:', error);
    }
  };

  const handleSaveChanges = async () => {
    const updatedNews = {
      id: editId,
      date: news.find((n) => n.id === editId)?.date,
      permalink: news.find((n) => n.id === editId)?.permalink,
      imagen: news.find((n) => n.id === editId)?.imagen,
      titulo,
      texto,
    };

    console.log(updatedNews);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/portalWebFormula1/noticias/${editId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedNews),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setNews((prevNews) =>
        prevNews.map((news) => (news.id === editId ? updatedNews : news))
      );
      setIsSheetOpen(false);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  const table = useReactTable({
    data: news,
    columns: columns(handleEdit, handleDelete),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter titles..."
          value={
            typeof table.getColumn('titulo')?.getFilterValue() === 'string'
              ? table.getColumn('title')?.getFilterValue()
              : ''
          }
          onChange={(event) =>
            table.getColumn('titulo')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide() && column.id !== 'acciones'
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Editar Noticia</SheetTitle>
            <SheetDescription>
              Edita la noticia con el ID: {editId}
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="id" className="text-right">
                ID
              </Label>
              <Input
                id="id"
                defaultValue={news.find((n) => n.id === editId)?.id}
                className="col-span-3 bg-gray-200"
                readOnly
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="date" className="text-right">
                Fecha
              </Label>
              <Input
                id="date"
                defaultValue={news.find((n) => n.id === editId)?.date}
                className="col-span-3 bg-gray-200"
                readOnly
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="permalink" className="text-right">
                Permalink
              </Label>
              <Input
                id="permalink"
                defaultValue={news.find((n) => n.id === editId)?.permalink}
                className="col-span-3 bg-gray-200"
                readOnly
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="titulo" className="text-right">
                Titulo
              </Label>
              <Input
                id="titulo"
                defaultValue={news.find((n) => n.id === editId)?.titulo}
                className="col-span-3"
                onChange={(event) => setTitulo(event.target.value)}
              />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="texto" className="text-right">
                Descripcion
              </Label>
              <textarea
                id="texto"
                defaultValue={news.find((n) => n.id === editId)?.texto}
                onChange={(event) => setTexto(event.target.value)}
                className="w-full h-64 col-span-3 p-2 border rounded"
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" onClick={handleSaveChanges}>
                Guardar cambios
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
