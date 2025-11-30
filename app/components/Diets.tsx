import React from 'react'
import {Diet} from '../types/diets'

interface DietsProps{
    diets:Diet[]
}

export default function Diets({diets}:DietsProps) {

    const icons = ['fa-solid fa-bowl-food','fa-solid fa-drumstick-bite','fa-solid fa-leaf']

    return (
        <section className="w-full px-6 xl:px-24 py-8">
            <h3 className="text-xl font-semibold mb-4">Explorar por dieta</h3>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                {diets.map((diet:Diet,index:number)=>(
                    <a
                        href={`diets/${encodeURIComponent(diet.name)}`}
                        target='_blank'
                        key={index}
                        className="cursor-pointer flex-1 bg-white rounded-lg p-6 shadow-sm hover:drop-shadow-md hover:scale-105 duration-500 transition-all border-2" 
                        style={{borderColor:diet.color}}
                    >
                        <span className="text-lg font-semibold mb-1" style={{color:diet.color}}>{diet.name} <i className={icons[index]}></i></span>
                        <p className="text-sm text-gray-500">{diet.description}</p>
                    </a>
                ))}

            </div>

        </section>
    )
}
