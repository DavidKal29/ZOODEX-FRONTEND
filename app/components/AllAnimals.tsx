import React from 'react'
import {Animal} from '../types/animal'
import AnimalCard from './AnimalCard'
import Pagination from './Pagination'

interface AllAnimalsProps{
    animals:Animal[] | [],
    page:string,
    totalPages:number
}

export default function AllAnimals({animals,page,totalPages}:AllAnimalsProps) {
  return (
    <section className="w-full px-6 xl:px-24 py-12">

        {(!animals || animals.length === 0) ? (
            <div className="w-full flex justify-center items-center h-64">
                <p className="text-gray-500 text-[25px]">Cargando...</p>
            </div>
        ) : 
                
        (
            <div className='grid grid-cols-1 gap-6 '>
                {/* Paginación Superior*/}
                <Pagination totalPages={totalPages} page={page} link={'all'}></Pagination>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {animals.map((animal:Animal,index:number)=>(
                        <AnimalCard key={index} animal={animal}></AnimalCard>
                    ))}
                </div>

                {/* Paginación Inferior*/}
                <Pagination totalPages={totalPages} page={page} link={'all'}></Pagination>

            </div>
        )}
    </section>
  )
}
