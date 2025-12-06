import React from 'react'
import {Animal} from '../types/animal'
import AnimalCard from './AnimalCard'
import RankingAnimalCard from './RankingAnimalCard'
import { useParams } from 'next/navigation'
import Pagination from './Pagination'

interface FullRankingProps{
    ranking:Animal[],
    name:string,
    totalPages:number,
    page:string
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
                    <Pagination totalPages={totalPages} page={page} link={`ranking/${name}`}></Pagination>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                        {ranking.map((animal:Animal,i:number)=>(
                            <RankingAnimalCard 
                                key={i} 
                                animal={animal} 
                                top={((parseInt(page,10) - 1) * 30) + (i + 1)} 
                                color={colors[index]}
                                feature={features[index]}
                                medide={medides[index]}
                            ></RankingAnimalCard>
                        ))}
                    
                    </div>

                    {/* Paginación Inferior*/}
                    <Pagination totalPages={totalPages} page={page} link={`ranking/${name}`}></Pagination>

                </div>
                
            )}
        </section>
    )
}
