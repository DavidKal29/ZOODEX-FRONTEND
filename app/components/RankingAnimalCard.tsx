import React from 'react'
import {Animal} from "../types/animal"

interface RankingAnimalCardProps{
    animal:Animal,
    top:number,
    feature:string,
    medide:string,
    color:string
}

export default function RankingAnimalCard({animal,top,feature,medide,color}:RankingAnimalCardProps) {
  return (
    <a
        href={`/animal/${animal?.name}`}
        target='_blank'
        className="relative border-2 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 bg-white"
        style={{ borderColor: animal.color }}
    >
        <div 
            className='absolute rounded-3xl text-white text-center z-10 -right-1 -top-3 px-4 py-1 text-sm' 
            style={{backgroundColor:color}}
        >
            {animal[feature]} {medide}
        </div>


        {/* Imagen del animal */}
        <div className="h-48 w-full rounded-t-2xl overflow-hidden flex justify-center items-center bg-gradient-to-r from-white via-gray-200 to-gray-300 py-4 drop-shadow-md">
            <img
            className="h-full object-contain"
            src={`/animals/${animal.image}`}
            alt={animal.name}
            />
        </div>

        {/* Información del animal */}
        <div className="p-4 flex flex-col gap-2">
            <p className="font-semibold text-sm" style={{color:color}}>TOP {top}</p>
            <h3 className="text-lg font-semibold">{animal.name}</h3>

            {/* Tipo con color dinámico */}
            <span
            className="rounded-full px-2 py-1 text-white text-sm w-fit text-center"
            style={{ backgroundColor: animal.color }}
            >
            {animal.type}
            </span>

            {/* Datos del Animal */}
            <div className="flex-1">
                <div className="text-xs text-gray-500">
                    {animal.category} - {animal.subcategory}
                </div>
            </div>
        </div>
    </a>
  )
}
