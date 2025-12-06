import React from 'react'
import {Animal} from '../types/animal'
import AnimalCard from './AnimalCard'
import RankingAnimalCard from './RankingAnimalCard'

interface FullRankingProps{
    ranking:Animal[],
    name:string,
    totalPages:number,
    page:number
}

export default function FullRanking({ranking,name,totalPages,page}:FullRankingProps) {

    const titles = ['Más Pesados','Más Altos','Más Rapidos','Más Longevos','Más Peligrosos','Más Inteligentes']

    const features = ['weight','height','speed','longevity','danger','inteligence']
    
    const medides = ['kg','mts','km/h','years','/100','/100']
    
    const icons = ['fa-solid fa-weight-scale','fa-solid fa-arrow-up','fa-solid fa-bolt','fa-solid fa-hourglass','fa-solid fa-skull','fa-solid fa-brain']
    
    const colors = ['#8B4513', '#3b82f6', '#facc15', '#fb923c', '#dc2626', '#ec4899', ]


    const index = titles.findIndex(t=>t === decodeURIComponent(name))
  
    return (
        <section className="w-full px-6 xl:px-24 py-12">
            <h3 className="text-xl font-semibold mb-4">{decodeURIComponent(name)} <i className={`${icons[index]}`} style={{color:colors[index]}}></i></h3>

            {(!ranking || ranking.length === 0) ? (
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
                
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {ranking.map((animal:Animal,i:number)=>(
                        <RankingAnimalCard 
                            key={i} 
                            animal={animal} 
                            top={i+1} 
                            color={colors[index]}
                            feature={features[index]}
                            medide={medides[index]}
                        ></RankingAnimalCard>
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
