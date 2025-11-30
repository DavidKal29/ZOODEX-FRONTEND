import React, { useEffect, useState } from 'react'
import {Category} from '../types/category'
import {Diet} from '../types/diets'
import {Type} from '../types/type'
import { toast } from 'sonner';
import Categories from './Categories';
import DietsAndTypes from './DietsAndTypes';

export default function FiltersSection() {
    const [categories, setCategories] = useState<Category[] | []>([])
    const [diets, setDiets] = useState<Diet[] | []>([])
    const [types, setTypes] = useState<Type[] | []>([])

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
                setTypes(data.types)
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
            <DietsAndTypes diets={diets} types={types}></DietsAndTypes>
            <Categories categories={categories}></Categories> 
        </section>
    )
}
