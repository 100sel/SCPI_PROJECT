import React from 'react'

export default function GlobalFilter({ filter, setFilter}) {

    return (
        <span className='searchBox'>
            Search : {' '}
            <input value={filter || ''} onChange={(e) => setFilter(e.target.value)} />
        </span>
    )
}