import React from 'react'
import { Animal } from '../types/animal'
import AnimalStatCard from './AnimalStatCard'

interface AnimalInfoProps {
  animal: Animal
}

export default function AnimalInfo({ animal }: AnimalInfoProps) {

  if (!animal) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-20 flex justify-center items-center">
        <p className="text-lg font-semibold">Cargando animal...</p>
      </section>
    )
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start gap-8">

            {/* Imagen */}
            <div className="w-full md:w-1/2 flex justify-center items-center">
                <img
                    src={`/animals/${animal.image}`}
                    className="w-[60%] md:w-full object-contain"
                    alt={animal.name}
                />
            </div>

            {/* Stats */}
            <div className="w-full grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 justify-items-center">

                <AnimalStatCard icon="fa-dna" color="text-green-600" title="Categoría"
                    value={animal.category[0]+animal.category.slice(1).toLowerCase()} />

                <AnimalStatCard icon="fa-bone" color="text-purple-600" title="Subcategoría"
                    value={animal.subcategory[0]+animal.subcategory.slice(1).toLowerCase()} />

                <AnimalStatCard icon="fa-utensils" color="text-yellow-600" title="Dieta"
                    value={animal.diet} />

                <AnimalStatCard icon="fa-earth-americas" color="text-red-600" title="Tipo"
                    value={animal.type} />

                <AnimalStatCard icon="fa-weight-scale" color="text-blue-600" title="Peso"
                    value={`${animal.weight} kg`} />

                <AnimalStatCard icon="fa-ruler-vertical" color="text-green-600" title="Altura"
                    value={`${animal.height} mts`} />

                <AnimalStatCard icon="fa-brain" color="text-purple-600" title="Inteligencia"
                    value={`${animal.inteligence}/100`} />

                <AnimalStatCard icon="fa-skull-crossbones" color="text-red-600" title="Peligrosidad"
                    value={`${animal.danger}/100`} />

                <AnimalStatCard icon="fa-hourglass-half" color="text-yellow-600" title="Longevidad"
                    value={`${animal.longevity} años`} />

                <AnimalStatCard icon="fa-bolt" color="text-red-600" title="Velocidad"
                    value={`${animal.speed} km/h`} />

                {/* Descripcion */}
                <div className="bg-white p-6 rounded-xl shadow flex flex-col col-span-full w-full">
                    <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                    <p className="text-base leading-relaxed">
                        {animal.description}
                    </p>
                </div>

            </div>
        </div>
    </section>
  )
}



