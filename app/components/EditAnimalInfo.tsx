"use client"
import React, { useEffect, useState } from 'react'
import {Animal} from '../types/animal'
import { toast } from 'sonner'
import SelectEdit from './SelectEdit'
import InputEdit from './InputEdit'
import { useRouter } from 'next/navigation'

interface EditAnimalInfoProps{
    animal:Animal | null,
    metadata:any
}

export default function EditAnimalInfo({animal,metadata}:EditAnimalInfoProps) {
    const router = useRouter();

    const [form,setForm] = useState({
        name:'',
        subcategory:'',
        diet:'',
        type:'',
        weight:0,
        height:0,
        inteligence:0,
        danger:0,
        longevity:0,
        speed:0,
        description:'',
    })

    useEffect(() => {
        if (animal) {
            setForm({
                name: animal.name,
                subcategory: animal.subcategory,
                diet: animal.diet,
                type: animal.type,
                weight: animal.weight,
                height: animal.height,
                inteligence: animal.inteligence,
                danger: animal.danger,
                longevity: animal.longevity,
                speed: animal.speed,
                description: animal.description
            })
        }
    }, [animal])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        setForm({
            ...form,
            [name]: type === "select-one" ? Number(value) : value
        })
    }


    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminsystem/editAnimal/${animal?.id}`, {
            method: 'POST',
            credentials: 'include',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(form)
        })
        .then(res=>res.json())
        .then(data=>{
            if (data.success) {
                router.push(`/animal/${form.name}`)
            }else {
                toast.error(data.error)
            }
        })
        .catch(()=>toast.error("Error en el servidor"))
    }

    if (!animal) {
        return (
            <div className="w-full flex justify-center items-center h-64">
                <p className="text-gray-500 text-[25px]">Cargando...</p>
            </div>
        );
    }

    return (
        <section className="px-4 py-10 lg:py-16 xl:mx-12">
            <form
                onSubmit={handleSubmit}
                className="relative bg-white shadow-xl rounded-2xl grid grid-cols-1 lg:grid-cols-2 gap-0 mt-24 xl:mx-12 max-w-[1100px] w-full"
            >
                {/* Boton de Animal */}
                <a href={`/animal/${animal.name}`} className="bg-blue-500 z-10 text-white cursor-pointer absolute rounded-full w-10 h-10 flex justify-center items-center -top-3 -right-1">
                    <p><i className="fa-solid fa-info"></i></p>
                </a>

                {/* IMAGEN */}
                <div className="flex flex-col justify-center items-center bg-gray-100 p-8">
                    <img
                        src={`/animals/${animal.image}`}
                        alt={animal.name}
                        className="object-contain max-h-[300px] lg:max-h-[400px]"
                    />
                </div>

                {/* FORMULARIO */}
                <div className="p-8 space-y-6 w-full">


                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">

                        <InputEdit
                            label="Nombre"
                            name="name"
                            type="text"
                            value={form.name}
                            icon="fa-paw text-black"
                            onChange={handleChange}
                        />


                        <SelectEdit
                            label="Subcategoría"
                            name="subcategory"
                            value={form.subcategory}
                            options={metadata.subcategories}
                            icon="fa-bone text-purple-600"
                            onChange={handleChange}
                        />

                        <SelectEdit
                            label="Dieta"
                            name="diet"
                            value={form.diet}
                            options={metadata.diets}
                            icon="fa-utensils text-yellow-600"
                            onChange={handleChange}
                        />

                        <SelectEdit
                            label="Tipo"
                            name="type"
                            value={form.type}
                            options={metadata.types}
                            icon="fa-earth-americas text-red-600"
                            onChange={handleChange}
                        />

                        <InputEdit
                            label="Peso"
                            name="weight"
                            type="number"
                            value={form.weight}
                            icon="fa-weight-scale text-blue-600"
                            onChange={handleChange}
                        />

                        <InputEdit
                            label="Altura"
                            name="height"
                            type="number"
                            value={form.height}
                            icon="fa-ruler-vertical text-green-600"
                            onChange={handleChange}
                        />


                        <InputEdit
                            label="Inteligencia"
                            name="inteligence"
                            type="number"
                            value={form.inteligence}
                            icon="fa-brain text-purple-600"
                            onChange={handleChange}
                        />

                        <InputEdit
                            label="Peligrosidad"
                            name="danger"
                            type="number"
                            value={form.danger}
                            icon="fa-skull-crossbones text-red-600"
                            onChange={handleChange}
                        />

                        <InputEdit
                            label="Longevidad"
                            name="longevity"
                            type="number"
                            value={form.longevity}
                            icon="fa-hourglass-half text-yellow-600"
                            onChange={handleChange}
                        />

                        <InputEdit
                            label="Velocidad"
                            name="speed"
                            type="number"
                            value={form.speed}
                            icon="fa-bolt text-red-600"
                            onChange={handleChange}
                        />

                    </div>

                    {/* DESCRIPCION */}
                    <div className="bg-gray-50 rounded-xl p-6 flex flex-col">
                        <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                        <textarea rows={4} name="description" className="border rounded-md p-2 resize-none"
                        value={form.description} onChange={handleChange}/>
                    </div>

                    {/* BOTON */}
                    <button className="cursor-pointer bg-blue-600 w-full py-3 rounded-xl text-white font-bold hover:bg-blue-700 duration-200">
                        Guardar Cambios
                    </button>

                </div>
            </form>
        </section>
    )
}
