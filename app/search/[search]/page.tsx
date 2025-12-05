'use client'
import React, { useEffect, useState } from 'react'
import Header from '@/app/components/Header'
import Banner from '@/app/components/Banner'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import {Animal} from '../../types/animal'
import SearchAnimals from '@/app/components/SearchAnimals'

export default function SearchPage() {    
    
    const router = useRouter()
    
    const { search } = useParams<{search:string}>();

    const [animals, setAnimals] = useState<Animal[] | []>([])

    const [error,setError] = useState<boolean | false>(false)

    const getAnimals = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/getSearchAnimals/`,{
            method:'POST',
            credentials:'include',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({search:decodeURIComponent(search)})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.success) {
                setAnimals(data.animals)
            }else{
                setError(true)
            }
        
        })
        .catch(error=>{
            console.log(error);
            toast.error('Error al enviar los datos')
        })
    }


    useEffect(()=>{
        getAnimals()
        document.title = 'Búsqueda'
    },[])
    
    
    return (
        <div className="flex flex-col justify-start items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
            <Header></Header>
                
            <Banner></Banner>   

            <SearchAnimals animals={animals} error={error}></SearchAnimals>
    

        </div>
    )
}