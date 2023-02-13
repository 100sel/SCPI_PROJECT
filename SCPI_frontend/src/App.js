import React, { useEffect, useState } from 'react'
import ScpiHdl from './ScpiHdl'

function App() {

  const [scpiList, setScpiList] = useState({});

  useEffect(() => {
    Refresh();
  }, []);

  function Refresh() {
    console.log("fecthing /api/refresh");
    fetch("/api/refresh").then(
      res => {
        return res.json()
      }
    ).then(
      data => {
        setScpiList(data);
    }
    )
  }

  return (
    <div className="App">
      <button onClick ={Refresh}>Refresh</button>
      {(typeof scpiList.scpiList === 'undefined' || scpiList.scpiList.length < 1) ? (
        <p>Loading...</p>
      ) : (
        <ScpiHdl scpiList={scpiList.scpiList} />
      )
      }
    </div>
  );
}

export default App;