'use client'
import React from 'react'
import usePiloto from "@/hooks/piloto/usePiloto"
import NewsCard from '@/components/ui/news-card'
import { TypographyH1 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Piloto = () => {
  const { listData } = usePiloto()
  return (
    <div className="container px-4 mx-auto md:px-6 lg:px-8">
      <TypographyH1 text="Pilotos" />
      <div className="mt-10">
        <div className='text-end py-4'>
          <Button variant='default'><Link href="/auth/signup">Nuevo</Link></Button>
        </div>
        {listData.map(({ nombre, apellidos, siglas, dorsal }, i) => (
          <div className="mb-6" key={i}>
            <NewsCard
              key={i}
              title={`${nombre} ${apellidos}`}
              href={``}
              description={`Sigla: ${siglas} Dorsal: ${dorsal}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
export default Piloto