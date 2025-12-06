import React from 'react'
import {Animal} from '../types/animal'
import AnimalCard from './AnimalCard'

interface AllAnimalsProps{
    animals:Animal[],
    page:number,
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
                <div className="flex justify-center items-center gap-2 mt-4 lg:mt-6 gap-4 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p, index) => (
                    <a
                        href={`/all/${index +  1}`}
                        key={index}
                        className={`flex justify-center items-center ${p === page ? 'bg-gray-700' : 'bg-gray-400'} text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition`}
                    >
                        {p}
                    </a>

                    ))}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {animals.map((animal:Animal,index:number)=>(
                        <AnimalCard key={index} animal={animal}></AnimalCard>
                    ))}
                </div>

                {/* Paginación Inferior*/}
                <div className="flex justify-center items-center gap-2 mt-4 lg:mt-6 gap-4 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p, index) => (
                    <a
                        href={`/all/${index +  1}`}
                        key={index}
                        className={`flex justify-center items-center ${p === page ? 'bg-gray-700' : 'bg-gray-400'} text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition`}
                    >
                        {p}
                    </a>

                    ))}
                </div>

            </div>
        )}
    </section>
  )
}
