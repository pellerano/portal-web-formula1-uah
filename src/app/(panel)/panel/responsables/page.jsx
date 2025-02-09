'use client'
import React from 'react'
import useResponsable from "@/hooks/responsable/useResponsable"
import { Button } from '@/components/ui/button'

import { Edit } from 'lucide-react';

import NewsDialog from '@/components/ui/news-dialog';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import DeleteResponsable from '@/components/common/modals/DeleteResponsable';
import EditResponsable from '@/components/common/modals/EditResponsable';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ResponsableEquipo = () => {
  const { listData, filteredData, filter,
    open, setOpen,
    openLoading, setOpenLoading,
    openDialogEdit, setOpenDialogEdit,
    idData, fnUpdateData,
    fnDeleteData
  } = useResponsable()

  const renderTableRows = (usersToRender) => {
    return usersToRender.map((data, key) => {
        return (
          <TableRow key={key}>
            <TableCell className="font-medium">{data.nombre}</TableCell>
            <TableCell>{data.email}</TableCell>
            <TableCell>{data.username}</TableCell>
            <TableCell>
              <div className="flex gap-2 justify-end">
                <Button variant='primary' onClick={()=>fnUpdateData(data.id)}>
                  <Edit />
                </Button>
                <DeleteResponsable data={data} fnDelete={fnDeleteData} />
              </div>
            </TableCell>
          </TableRow>
        );
    });
  };

  return (
    <div className="p-10 pt-3">
      <h1 className="mb-6 text-2xl font-bold">Responsables de equipo</h1>
      <div className='text-enddd py-4'>
        <NewsDialog 
                id="dialogNewPiloto"
                buttonTrigerProps={{value:"Nuevo", style:{background: 'black', color: 'white', padding: '6px', borderRadius: '10%'}}}
                dialogTitle=""
                description=""
                content={<EditResponsable
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
      </div>
      <Card className="p-4">
        <ScrollArea className="h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black">Nombres</TableHead>
                <TableHead className="font-bold text-black">Email</TableHead>
                <TableHead className="font-bold text-black">Usuario</TableHead>
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
          content={<EditResponsable
                  dataId={idData}
                  eMSeg={new Date().getMilliseconds()} 
                />}
            open={openDialogEdit}
            setOpen={setOpenDialogEdit}
            />
    </div>
  )
}
export default ResponsableEquipo