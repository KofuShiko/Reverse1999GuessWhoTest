import { useEffect, useState } from 'react';

function Cards({characters, exclude, excluded}) {
    return(
        <section className="flex flex-wrap justify-center *:rounded-md md:gap-5 gap-2 m-4 md:mx-15 mx-4 *:m-1 *:bg-linear-to-t *:from-amber-800 *:to-transparent *:shadow-lg *:shadow-black/40 *:flex *:flex-col *:md:w-32 *:md:h-48 *:w-24 *:h-40 *:items-center *:text-center select-none text-sm text-white/70 *:hover:scale-105 *:hover:-translate-y-2 *:duration-300">
            {characters && characters.map((img) => (
                <div key={img.id} className={exclude.includes(img.id) ? 'opacity-30' : ''}>
                    <img src={img.url || img.default || img} onClick={() => excluded(img.id)} className="overflow-hidden md:w-32 md:h-43 w-24 h-33"/>
                    <p className='flex-1 flex items-center justify-center w-full px-1 text-xs line-clamp-2 leading-tight'>{img.name}</p>
                </div>
            ))}
        </section>
    )
}

export default Cards