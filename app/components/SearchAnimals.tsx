import React from 'react'
import { Animal } from '../types/animal'
import AnimalCard from './AnimalCard'

interface SearchAnimalsProps {
    animals: Animal[] | []
    error: boolean
}

export default function SearchAnimals({ animals, error }: SearchAnimalsProps) {
  return (
    <section className="w-full px-6 xl:px-24 py-12">
      <h3 className="text-xl font-semibold mb-4">Todos</h3>

      {error ? (
        <div className="w-full flex justify-center items-center h-64">
          <p className="text-gray-500 text-[25px] text-center">No se han encontrado animales</p>
        </div>
      ) : (!animals || animals.length === 0) ? (
        <div className="w-full flex justify-center items-center h-64">
          <p className="text-gray-500 text-[25px]">Cargando...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {animals.map((animal: Animal, index: number) => (
            <AnimalCard key={index} animal={animal} />
          ))}
        </div>
      )}
    </section>
  )
}
