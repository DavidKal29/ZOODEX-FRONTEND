import React from 'react'
import {Animal} from "../types/animal"
import AnimalCard from './AnimalCard'

interface RandomAnimalsProps {
    randomAnimals:Animal[]
}

export default function RandomAnimals({randomAnimals}:RandomAnimalsProps) {
  return (
    <section id='featured' className="w-full px-6 xl:px-24 py-8 scroll-mt-18">
        <h3 className="text-xl font-semibold mb-4">Animales Destacados</h3>

        {(!randomAnimals || randomAnimals.length === 0) ? (
          <div className="w-full flex justify-center items-center h-64">
            <p className="text-gray-500 text-[25px]">Cargando...</p>
          </div>
        ) : 
        
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {randomAnimals.map((animal: Animal, index: number) => (
              <AnimalCard animal={animal} key={index}></AnimalCard>
            ))}
          </div>
        )}
      </section>
  )
}
