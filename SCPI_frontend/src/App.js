import React, {useEffect, useState} from 'react'
import ScpiHdl from './ScpiHdl'

function App() {

    const [scpiList, setScpiList] = useState([]);

    useEffect(() => {
        refresh();
    }, []);

    function refresh() {
        console.log("fecthing /api/refresh");
        fetch("/api/refresh").then(res => res.json()).then(setScpiList)
    }

    return (
        <div className="App">
            <button onClick={refresh}>Refresh</button>
            {(typeof scpiList === 'undefined' || scpiList.length < 1) ? (
                <p>Loading...</p>
            ) : (
                <ScpiHdl scpiList={scpiList}/>
            )
            }
        </div>
    );
}

export default App;