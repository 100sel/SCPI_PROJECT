import React from 'react'

export default function GlobalFilter({ filter, setFilter}) {

    return (
        <div className='searchBoxHdl'>
            Search : <input className="searchBox" value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
        </div>
    )
}