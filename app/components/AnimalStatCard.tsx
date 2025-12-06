import React from 'react'

interface AnimalStatCardProps {
  icon: string
  color: string
  title: string
  value: string | number
}

export default function AnimalStatCard({
  icon,
  color,
  title,
  value,
}: AnimalStatCardProps) {
  return (
    <div className="bg-white p-4 rounded-xl lg:px-2 flex flex-col items-start w-full drop-shadow-md">
      <h3 className="text-sm font-bold flex items-center gap-2">
        <i className={`fa-solid ${icon} ${color}`}></i> {title}
      </h3>
      <p>{value}</p>
    </div>
  )
}

