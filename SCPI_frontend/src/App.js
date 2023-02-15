import React, { useEffect, useState, useMemo } from 'react'
import { tableColumns} from './tableColumns'
import Table from './tableComp'

function App() {

    const [scpiList, setScpiList] = useState([]);

    useEffect(() => {
        refresh();
    }, []);

    function refresh() {
        console.log("fecthing /api/refresh");
        fetch("/api/refresh").then(res => res.json()).then(setScpiList)
    }

    const TABLECOLUMNS = useMemo(() => tableColumns, []);
    const TABLEDATA = useMemo(()=> scpiList, [scpiList]);

    return (
        <div className="App">

            <header className="Header">
                <h1 className="titlePage">SCPI DATA</h1>
            </header>

            <div className="dataTable">
                <button onClick={refresh}>Refresh</button>
                {(!scpiList?.length) ? (
                    <p>Loading...</p>
                ) : (
                    <Table columns={TABLECOLUMNS} data={TABLEDATA} />
                )
                }
            </div>
        </div>
    );
}

export default App;