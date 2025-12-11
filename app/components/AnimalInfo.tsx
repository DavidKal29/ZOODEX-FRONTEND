import React from "react";
import { Animal } from "../types/animal";
import { User } from "../types/user";
import AnimalStatCard from "./AnimalStatCard";

interface AnimalInfoProps {
  animal: Animal | null,
  user:User | null
}

export default function AnimalInfo({animal, user}: AnimalInfoProps) {

  if (!animal) {
    return (
      <div className="w-full flex justify-center items-center h-64">
        <p className="text-gray-500 text-[25px]">Cargando...</p>
      </div>
    );
  }

  return (
    <section className="px-4 py-10 lg:py-16 mt-24 xl:mx-12">

      <div className="relative bg-white shadow-xl rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-0">

        {/* Boton de Admin */}
        {user && (
          <a href={`/editAnimal/${animal.id}`} className="bg-red-500 z-10 text-white cursor-pointer absolute rounded-full w-10 h-10 flex justify-center items-center -top-3 -right-1">
            <p><i className="fa-solid fa-pen"></i></p>
          </a>
        )}
        
        {/* Imagen */}
        <div className="flex flex-col justify-center items-center bg-gray-100 p-8">
          <img
            src={`/animals/${animal.image}`}
            alt={animal.name}
            className="object-contain max-h-[300px] lg:max-h-[400px]"
          />
          <h2 className="text-2xl md:text-3xl font-bold mt-6">{animal.name}</h2>
        </div>

        {/* Datos */}
        <div className="p-8 space-y-6">

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">

            <AnimalStatCard icon="fa-dna" color="text-green-600" title="Categoría"
              value={animal.category[0] + animal.category.slice(1).toLowerCase()}
            />

            <AnimalStatCard icon="fa-bone" color="text-purple-600" title="Subcategoría"
              value={animal.subcategory[0] + animal.subcategory.slice(1).toLowerCase()}
            />

            <AnimalStatCard icon="fa-utensils" color="text-yellow-600" title="Dieta"
              value={animal.diet}
            />

            <AnimalStatCard icon="fa-earth-americas" color="text-red-600" title="Tipo"
              value={animal.type}
            />

            <AnimalStatCard icon="fa-weight-scale" color="text-blue-600" title="Peso"
              value={`${animal.weight} kg`}
            />

            <AnimalStatCard icon="fa-ruler-vertical" color="text-green-600" title="Altura"
              value={`${animal.height} mts`}
            />

            <AnimalStatCard icon="fa-brain" color="text-purple-600" title="Inteligencia"
              value={`${animal.inteligence}/100`}
            />

            <AnimalStatCard icon="fa-skull-crossbones" color="text-red-600" title="Peligrosidad"
              value={`${animal.danger}/100`}
            />

            <AnimalStatCard icon="fa-hourglass-half" color="text-yellow-600" title="Longevidad"
              value={`${animal.longevity} años`}
            />

            <AnimalStatCard icon="fa-bolt" color="text-red-600" title="Velocidad"
              value={`${animal.speed} km/h`}
            />    

          </div>

          {/* Descripción */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">Descripción</h3>
            <p className="leading-relaxed text-gray-700">
              {animal.description}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

