'use client'
import React from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Rankings from '../components/Rankings'

export default function RankingsPage() {
  return (
    <div className="flex flex-col justify-start items-center bg-gradient-to-r from-gray-300 via-white to-gray-300 min-h-screen">
        <Header></Header>
    
        <Banner></Banner>

        <Rankings></Rankings>
          
    
    </div>
  )
}
