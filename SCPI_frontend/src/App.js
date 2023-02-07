import React, { useEffect, useState } from 'react'
import ScpiHdl from './ScpiHdl'

function App() {

  const [scpiList, setScpiList] = useState({});

  useEffect(() => {
    RefreshView();
  }, []);

  function RefreshView() {
    console.log("fecthing /api/results");
    fetch("/api/results").then(
      res => {
        return res.json()
      }
    ).then(
      data => {
        setScpiList(data);
    }
    )
  }

  function RefreshData() {
    console.log("fecthing /api/refresh");
    fetch("/api/refresh");
  }

  return (
    <div className="App">
      <button onClick ={RefreshData}>Refresh Data</button>
      <button onClick ={RefreshView}>Refresh View</button>
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