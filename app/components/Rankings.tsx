import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {Animal} from '../types/animal'

export default function Rankings() {
    const [rankings, setRankings] = useState([])

    const features = ['weight','height','speed','longevity','danger','inteligence']
    
    const medides = ['kg','mts','km/h','years','/100','/100']
    
    const icons = ['fa-solid fa-weight-scale','fa-solid fa-arrow-up','fa-solid fa-bolt','fa-solid fa-hourglass','fa-solid fa-skull','fa-solid fa-brain']
    
    const colors = ['#8B4513', '#3b82f6', '#facc15', '#fb923c', '#dc2626', '#ec4899', ]
    

    const getRankings = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/getTop5Rankings`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.success) {
                setRankings(data.rankings)
            }
        
        })
        .catch(error=>{
            console.log(error);
            toast.error('Error al enviar los datos')
        })
    }

    useEffect(()=>{
        getRankings()
    },[])

    useEffect(() => {
        if (rankings.length > 0 && window.location.hash === '#rankings') {
            const element = document.getElementById("rankings")
    
            if (element) {
                const y = element.getBoundingClientRect().top + window.pageYOffset - 72
                window.scrollTo({ top: y })
            }
        }
    }, [rankings])
    
  
    return (
        <section id='rankings' className="w-full px-6 xl:px-24 py-8 scroll-mt-18">
            <h3 className="text-xl font-semibold mb-4">Rankings</h3>

            {(!rankings || rankings.length === 0) ? (
            <div className="w-full flex justify-center items-center h-64">
                <p className="text-gray-500 text-[25px]">Cargando...</p>
            </div>
            ) : 
            
            (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(rankings).map((key:string, index:number) => (
                    <a  
                        href={`/ranking/${encodeURIComponent(key)}`}
                        target='_blank'
                        key={index} 
                        className="bg-white rounded-lg p-4 shadow-sm hover:scale-105 duration-300 cursor-pointer transition-all hover:shadow-2xl"
                    >
                        {/* Titulo del ranking */}
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                            {key} <i className={`${icons[index]}` } style={{color:colors[index]}}></i>
                        </h4>

                        {/* Lista con todos los animales de ese ranking */}
                        <ol className="pl-5 space-y-3 text-sm text-black">
                            {rankings[key].map((animal:Animal, index2:number) => (
                                <li key={index2} className="flex items-center gap-3 py-1">
                                    <div className={`text-sm font-extrabold`} style={{color:colors[index]}}>
                                        {index2 + 1}
                                    </div>

                                    {/* Imagen del animal */}
                                    <img src={`/animals/${animal.image}`} alt={animal.name} className="w-10 h-10 p-1" />

                                    {/* Informacion del animal */}
                                    <div className="flex-1">
                                        <span>{animal.name}</span>
                                        <div className="text-xs text-gray-500">
                                        {animal.category} - {animal.subcategory}
                                        </div>
                                    </div>

                                    {/* Medida del ranking */}
                                    <div className="text-sm text-gray-700 font-mono">
                                        {animal[features[index]]} {medides[index]}
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </a>
                ))}
            </div>
            )}

            
        </section>
       
    )
}
