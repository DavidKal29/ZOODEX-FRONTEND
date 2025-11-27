import React from 'react'
import {Animal} from "../types/animal"

interface RandomAnimalsProps {
    randomAnimals:Animal[]
}

export default function RandomAnimals({randomAnimals}:RandomAnimalsProps) {
  return (
    <div className="w-full px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Animales Destacados</h2>

        {(!randomAnimals || randomAnimals.length === 0) ? (
          <div className="w-full flex justify-center items-center h-64">
            <p className="text-gray-500 text-[25px]">Cargando...</p>
          </div>
        ) : 
        
        (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {randomAnimals.map((animal: Animal, index: number) => (
              <div
                key={index}
                className="card border-2 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
                style={{ borderColor: animal.color }}
              >
                {/* Imagen del animal */}
                <div className="h-48 w-full overflow-hidden flex justify-center items-center bg-gradient-to-r from-white via-gray-200 to-gray-300 py-4 drop-shadow-md">
                  <img
                    className="h-full object-contain"
                    src={`/animals/${animal.image}`}
                    alt={animal.name}
                  />
                </div>

                {/* Información del animal */}
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-gray-500 text-sm">N&#176; {animal.id}</p>
                  <h3 className="text-lg font-semibold">{animal.name}</h3>

                  {/* Tipo con color dinámico */}
                  <span
                    className="rounded-full px-2 py-1 text-white text-sm w-fit text-center"
                    style={{ backgroundColor: animal.color }}
                  >
                    {animal.type}
                  </span>

                  {/* Altura y peso */}
                  <div className="mt-2 text-gray-700 text-sm flex flex-col gap-1">
                    <p><strong>Altura:</strong> {animal.height} cm</p>
                    <p><strong>Peso:</strong> {animal.weight} kg</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
  )
}
