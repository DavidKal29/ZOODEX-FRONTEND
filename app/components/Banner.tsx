import React from 'react'

export default function Banner() {
  return (
    <section className="relative w-full">

        {/* Imagen de fondo */}
        <img
            src="https://carboninstitute.org/wp-content/uploads/2019/11/carbon-institute-forests-header-1600x900.jpg"
            alt="banner"
            className="w-full h-[18rem] md:h-[24rem] lg:h-[30rem] object-cover"
        />

        {/* Degradado oscuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/20"></div>

        {/* Degradado transparente */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>  

        {/* Texto */}
        <div className="absolute left-6 md:left-20 bottom-10 text-white">
            <h2 className="text-4xl md:text-5xl font-extrabold">
                ZOODEX
            </h2>

            <p className="mt-2 text-sm md:text-lg max-w-xl font-semibold opacity-95">
                Una enciclopedia interactiva de animales — explora por zona, categoría, dieta y descubre rankings épicos.
            </p>
        </div>

    </section>

  )
}
