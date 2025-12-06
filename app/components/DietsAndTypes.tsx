import React, { useEffect } from 'react'
import {Diet} from '../types/diets'
import {Type} from '../types/type'

interface DietsAndTypesProps{
    diets:Diet[],
    types:Type[]
}

export default function DietsAndTypes({diets,types}:DietsAndTypesProps) {

    const dietsIcons = [
        'fa-solid fa-bowl-food',
        'fa-solid fa-drumstick-bite',
        'fa-solid fa-leaf',
        
    ]

    const typesIcons = [
        'fa-solid fa-mountain',
        'fa-solid fa-water',
        'fa-solid fa-frog',
        'fa-solid fa-dove',
        'fa-solid fa-house',
        'fa-solid fa-tree'
    ]
    
    useEffect(() => {
    if (diets.length > 0 && window.location.hash === '#dietstypes') {
        const element = document.getElementById("dietstypes")

        if (element) {
            const y = element.getBoundingClientRect().top + window.pageYOffset - 72 
            window.scrollTo({ top: y })
        }
    }
    }, [diets])



    return (
        <section id='dietstypes' className="w-full px-6 xl:px-24 py-8 scroll-mt-18">
            <h3 className="text-xl font-semibold mb-4">Explorar por Dieta o Tipo</h3>


            {(!types || types.length === 0 || !diets || diets.length === 0) ? (
                <div className="w-full flex justify-center items-center h-64">
                    <p className="text-gray-500 text-[25px]">Cargando...</p>
                </div>
            ) : 
                    
            (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                    {diets.map((diet:Diet,index:number)=>(
                        <a
                            href={`diets/${encodeURIComponent(diet.name)}`}
                            target='_blank'
                            key={index}
                            className="cursor-pointer flex-1 bg-white rounded-lg p-6 shadow-sm hover:drop-shadow-md hover:scale-105 duration-500 transition-all border-2" 
                            style={{borderColor:diet.color}}
                        >
                            <span className="text-lg font-semibold mb-1" style={{color:diet.color}}>{diet.name} <i className={dietsIcons[index]}></i></span>
                            <p className="text-sm text-gray-500">{diet.description}</p>
                        </a>
                    ))}

                    {types.map((type:Type,index:number)=>(
                        <a
                            href={`type/${encodeURIComponent(type.name)}`}
                            target='_blank'
                            key={index}
                            className="cursor-pointer flex-1 bg-white rounded-lg p-6 shadow-sm hover:drop-shadow-md hover:scale-105 duration-500 transition-all border-2" 
                            style={{borderColor:type.color}}
                        >
                            <span className="text-lg font-semibold mb-1" style={{color:type.color}}>{type.name} <i className={typesIcons[index]}></i></span>
                            <p className="text-sm text-gray-500">{type.description}</p>
                        </a>
                    ))}

                </div> 
            )}

            
            

        </section>
    )
}
