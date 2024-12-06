'use client'
import React from 'react'
import usePiloto from "@/hooks/piloto/usePiloto"
import NewsCard from '@/components/ui/news-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TypographyH3 } from '@/components/ui/typographyH3'

const Piloto = () => {
  const { listData } = usePiloto()
  return (
    <div className="container px-4 mx-auto md:px-6 lg:px-8">
      <TypographyH3 text="Pilotos" />
      <div className="mt-5">
        <div className='text-end py-4'>
          <Button variant='default'><Link href="/pilotos/nuevo">Nuevo</Link></Button>
        </div>
        {listData.map(({ id, nombre, apellidos, siglas, dorsal }, i) => (
          <div className="mb-6" key={i}>
            <NewsCard
              key={i}
              title={`${nombre} ${apellidos}`}
              href={`/pilotos/${id}`}
              description={`Sigla: ${siglas} Dorsal: ${dorsal}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Piloto