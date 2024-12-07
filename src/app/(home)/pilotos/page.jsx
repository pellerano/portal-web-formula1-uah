'use client'
import React from 'react'
import usePiloto from "@/hooks/piloto/usePiloto"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TypographyH3 } from '@/components/ui/typographyH3'
import PilotoCard from '@/components/ui/piloto-card'

const Piloto = () => {
  const { listData } = usePiloto()
  return (
    <div className="container px-4 mx-auto md:px-6 lg:px-8">
      <TypographyH3 text="Pilotos" />
      <div className="mt-5">
        <div className='text-end py-4'>
          <Button variant='default'><Link href="/pilotos/nuevo">Nuevo</Link></Button>
        </div>
        {listData.map(({ id, nombre, apellidos, siglas, dorsal, pais, dataurlb64 }, i) => (
          <div className="mb-6" key={i}>
            <PilotoCard
              key={i}
              title={`${nombre} ${apellidos}`}
              href={`/pilotos/${id}`}
              description={`Sigla: ${siglas} Dorsal: ${dorsal} Pais: ${pais}`}
              dataFotoB64={dataurlb64}
              siglas={siglas} 
              dorsal={dorsal} 
              pais={pais}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Piloto