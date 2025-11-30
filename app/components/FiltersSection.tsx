import React, { useEffect, useState } from 'react'
import {Category} from '../types/category'
import {Diet} from '../types/diets'
import { toast } from 'sonner';
import Categories from './Categories';
import Diets from './Diets';

export default function FiltersSection() {
    const [categories, setCategories] = useState<Category[] | []>([])
    const [diets, setDiets] = useState<Diet[] | []>([])

    const getAllFilters = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/animals/getAllFilters`,{
            method:'GET',
            credentials:'include'
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.success) {
                setCategories(data.categories)
                setDiets(data.diets)
            }
        
        })
        .catch(error=>{
            console.log(error);
            toast.error('Error al enviar los datos')
        })
    }

    useEffect(()=>{
        getAllFilters()
    },[])
    
    
    return (
        <section className='flex flex-col justify-center items-center w-full gap-8'>
            <Diets diets={diets}></Diets>
            <Categories categories={categories}></Categories>
            
            
            
        </section>
    )
}
