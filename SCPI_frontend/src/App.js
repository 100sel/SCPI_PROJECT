import React, { useEffect, useState, useMemo } from 'react'
import { tableColumns} from './Table/tableColumns'
import Table from './Table/tableComp'

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
        <div class="container" className="App">

            <header className="header" class="container">
                <h1 className="titlePage">SCPI DATA</h1>
            </header>

            <main className="main" class="container">
                <button className="buttonRefresh" onClick={refresh}>Refresh</button>
                {(!scpiList?.length) ? (
                    <p>Loading...</p>
                ) : (
                    
                    <Table columns={TABLECOLUMNS} data={TABLEDATA} />
                )
                }
            </main>
        </div>
    );
}

export default App;