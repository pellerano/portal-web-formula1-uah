'use client'
import React from 'react'
import usePiloto from "@/hooks/piloto/usePiloto"
import { Button } from '@/components/ui/button'

import { Edit } from 'lucide-react';

import NewsDialog from '@/components/ui/news-dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeletePiloto from '@/components/common/modals/DeletePiloto';
//import EditPiloto from './EditPiloto';
import EditPiloto from '@/components/common/modals/EditPiloto';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const Piloto = () => {
  const { listData, filteredData, filter, statusFilter, setStatusFilter,
    open, setOpen,
    openLoading, setOpenLoading,
    openDialogEdit, setOpenDialogEdit,
    idData, fnUpdateData
  } = usePiloto()

  const renderTableRows = (usersToRender) => {
    return usersToRender.map((data, key) => {
        return (
          <TableRow key={key}>
            <TableCell className="font-medium">{data.nombre}</TableCell>
            <TableCell>{data.apellidos}</TableCell>
            <TableCell>{data.pais}</TableCell>
            <TableCell>{data.siglas}</TableCell>
            <TableCell>{data.dorsal}</TableCell>
            <TableCell>
              <Badge
                className={`${
                  data.estado === 1
                    ? 'bg-green-700'
                    : data.estado === 0
                    ? 'bg-red-400'
                    : ''
                }`}
                variant={`${data.estado == 'Rechazado' ? 'destructive' : ''}`}
              >
                {data.estado===1?"Alta":"Baja"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex gap-2 justify-end">
                {/* <EditPiloto dataId={data.id} deleteUser={() => {}} /> */}
                <Button variant='primary' onClick={()=>fnUpdateData(data.id)}>
                  <Edit />
                </Button>
                {/* <DeletePiloto data={data} deleteUser={() => {}} /> */}
              </div>
            </TableCell>
          </TableRow>
        );
    });
  };

  return (
    <div className="p-10 pt-3">
      <h1 className="mb-6 text-2xl font-bold">Pilotos</h1>
      <div className='text-enddd py-4'>
        <NewsDialog 
                id="dialogNewPiloto"
                buttonTrigerProps={{value:"Nuevo", style:{background: 'black', color: 'white', padding: '6px', borderRadius: '10%'}}}
                dialogTitle=""
                description=""
                content={<EditPiloto
                      dataId={0}
                      eMSeg={new Date().getMilliseconds()} 
                      funcionCloseDialog={() => { setOpen(false)}} 
                      funcionOpenLoading={() => { setOpenLoading(true) }}
                      funcionCloseLoading={() => { setOpenLoading(false) }}
                    />}
                open={open}
                setOpen={setOpen}
              />
      </div>
      <div className="flex items-center justify-between mb-6">
        <div className="w-1/3">
          <Input onChange={filter} className="p-4 py-4" placeholder="Buscar" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Filtrar</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtrar por Estado</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              {['all', 'Alta', 'Baja'].map((status) => (
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
                <TableHead className="font-bold text-black">Nombre</TableHead>
                <TableHead className="font-bold text-black">Apellido</TableHead>
                <TableHead className="font-bold text-black">Pais</TableHead>
                <TableHead className="font-bold text-black">Siglas</TableHead>
                <TableHead className="font-bold text-black">Dorsal</TableHead>
                <TableHead className="font-bold text-black">Estado</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length
                ? renderTableRows(filteredData)
                : renderTableRows(listData)}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      <NewsDialog 
            id={`dialogEditPiloto${idData}`}
            buttonTrigerProps={{}}
            dialogTitle=""
            description=""
          content={<EditPiloto
                  dataId={idData}
                  eMSeg={new Date().getMilliseconds()} 
                  setOpenDialogEditCircuit={setOpenDialogEdit}
                />}
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            />
    </div>
  )
}
export default Piloto