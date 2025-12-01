'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import {Animal} from '../types/animal'
import { useParams, useRouter } from 'next/navigation';
import FullRanking from '@/app/components/FullRanking';
import Header from '@/app/components/Header';
import Banner from '@/app/components/Banner';

export default function Ranking() {

    const router = useRouter()
    
    const { name } = useParams<{name:string}>();

    const [ranking, setRanking] = useState<Animal[] | []>([])

    const getAnimals = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/getFullRanking/${name}`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.success) {
                setRanking(data.ranking)
            }else{
                router.push('/*')
            }
        
        })
        .catch(error=>{
            console.log(error);
            toast.error('Error al enviar los datos')
        })
    }

    useEffect(()=>{
        getAnimals()
        document.title = `${decodeURIComponent(name)}`
    },[])
    
    
    return (

        <div className="flex flex-col justify-start items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
            <Header></Header>
        
            <Banner></Banner>

            <FullRanking ranking={ranking} name={name}></FullRanking>                         
        </div>
        
    )
}
