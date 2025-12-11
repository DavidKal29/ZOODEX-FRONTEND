'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Profile() {
    const [form, setForm] = useState({ email: '',username: '', password: '' })
    const [showPassword, setShowPassword] = useState(false)

    const router = useRouter()

    const getDashboard = ()=>{
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminsystem/dashboard/`, {
            credentials: 'include',
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setForm({...form, email:data.user.email, username:data.user.username})
            } else {
                router.push('/login')
            }
        })
        .catch(() => { toast.error('Error al enviar datos') })
    }

    const logout = ()=>{
        toast("¿Seguro que quieres cerrar sesión?", {
            action: {
                label: "Cerrar sesión",
                onClick: () => {
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminsystem/logout`, {
                        method: 'GET',
                        credentials: 'include',
                    })
                    .then(res => res.json())
                    .then(data => {
                    if (data.success) {
                        router.push('/');
                    } else {
                        toast.error(data.error);
                    }
                    })
                    .catch(error => {
                        console.log('Error al enviar los datos a Logout');
                        console.error(error);
                        toast.error('Error al enviar los datos');
                    });
                },
            },
            cancel: {
                label: "Cancelar",
            }
        } as any)
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/adminsystem/editProfile/`, {
            credentials: 'include',
            method: 'POST',
            body: JSON.stringify(form),
            headers: { 'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {  
                toast.success(data.success)
                form.password = ''
                    
            } else {
                toast.error(data.error)
            }
        })
        .catch(() => { toast.error('Error al enviar datos') })
    }

    useEffect(()=>{
        document.title = 'Perfil'
        getDashboard()
    },[])

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
            <Header></Header>

            <form
                className="bg-white drop-shadow-2xl rounded-2xl max-[360px]:mt-24 min-[568px]:mt-26 mt-0 p-8 m-2 sm:w-full max-w-md  flex flex-col gap-6 text-white"
                onSubmit={handleSubmit}
            >
                <h1 className="text-3xl font-extrabold text-center text-gray-800">
                    EDITAR PERFIL
                </h1>

                {/* Email */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-600">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Introduce tu email"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500 text-gray-500"
                    />
                </div>

                {/* Username */}
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-600">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Introduce tu username"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500 text-gray-500"
                    />
                </div>

                {/* Contraseña */}
                <div className="flex flex-col relative">
                    <label htmlFor="password" className="text-sm font-semibold text-gray-600">
                        Contraseña
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Introduce tu contraseña"
                        className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder:text-gray-500 text-gray-500"
                    />

                    <i
                        className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute right-3 top-9 text-gray-600 cursor-pointer`}
                        onClick={() => setShowPassword(!showPassword)}
                    ></i>
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    className="cursor-pointer bg-gradient-to-r from-gray-500 to-gray-700 hover:bg-gray-800 text-whitefont-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Enviar
                </button>

                {/* cerrar sesion button */}
                <button
                    type="button"
                    onClick={()=>{logout()}}
                    className="cursor-pointer bg-gradient-to-r from-red-500 to-red-700 hover:bg-red-800 text-whitefont-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Cerrar Sesión
                </button>

                
            </form>                              

            
        </div>
    )
}
