import React from 'react'

export function ColumnFilter({ column }) {
    const {filterValue, setFilter} = column;

    return (
        <span className='searchBox'>
            Search : {' '}
            <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value)} />
        </span>
    )
}