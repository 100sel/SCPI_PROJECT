import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'

export default function GlobalFilter({ filter, setFilter }) {

    const [value, setValue] = useState(filter)

    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined)
    }, 250)

    return (
        <div className='searchBoxHdl'>
            Search : <input
                className="searchBox"
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value)
                    onChange(e.target.value)
                }}
            />
        </div>
    )
}