import { useState } from 'react';

function Buttons({categoryNames, excluded, onToggle, reset, hideToggle, hidden}) {
    return(
        <section className="sticky top-0 z-10 flex flex-wrap md:justify-between justify-center item-center gap-3 p-2 py-4 bg-linear-to-b from-black to-transparent text-white/80 text-xs">
            <div className='md:text-left text-center'>
                <span className='text-xl font-serif'>Reverse:1999</span>
                <h1 className="text-xs">Guess Who Game</h1>
            </div>
            <div className='text-center *:m-1 *:rounded-md *:p-1 *:px-3 *:font-bold *:hover:text-white/90 *:duration-300'>
            {categoryNames && categoryNames.map((category) => {
                const excludedCategory = excluded.includes(category);
                return (
                <button key={category} onClick = {() => onToggle(category)} className={excludedCategory ? 'bg-black/30 hover:bg-black/50' : 'bg-amber-700 hover:bg-amber-600'}>
                    {category}
                </button>
                );
            })}
                <button onClick={hideToggle} className="text-xs">{hidden ? 'Show All' : 'Hide Excluded'}</button>
            </div>
            <button onClick={reset} className="rounded-md m-1 p-1 px-3 text-white/80 font-bold duration-300 bg-mist-800 hover:bg-mist-700 hover:text-white/90">
                Reset
            </button>
        </section>
    )
}

export default Buttons