import React from 'react'
interface PaginationProps{
    totalPages:number,
    page:number,
    link:string
}

export default function Pagination({totalPages,page,link}:PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-4 lg:mt-6 gap-4 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p, index) => (
        <a
            href={`/${link}/${index +  1}`}
            key={index}
            className={`flex justify-center items-center ${p === page ? 'bg-gray-700' : 'bg-gray-400'} text-white px-4 py-2 rounded-full font-bold hover:scale-105 transition`}
        >
            {p}
        </a>

        ))}
    </div>
  )
}
