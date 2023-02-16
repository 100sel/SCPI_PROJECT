import React, {useMemo} from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from "react-table";
import GlobalFilter from './tableGlobalFilter'
import {ColumnFilter} from './tableColumnFilter'

export default function Table({columns, data}) {
    const defaultColumn = useMemo(() => {
        return {
            Filter: ColumnFilter,
            disableFilters: true
        }
    }, []) 
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
    } = useTable({ columns, data, defaultColumn }, useFilters, useGlobalFilter, useSortBy)

    const {globalFilter} = state

    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> 
        <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}                                        
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' ⬇️' : ' ⬆️') : ''}
                                        </span>
                                        <div>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className='tableBody' {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row)
                            return (
                                <tr className='row'{...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td className='cell' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                            )
                                    })}
                                </tr>
                            )
                        })}               
                    </tbody>
                </table>
                </>
    )
}



