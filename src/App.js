import React, { useState } from 'react';

// import './App.css';
import Cases from './Cases';
import Main from './Main';

function App() {

  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [firstComponentWidth, setFirstComponentWidth] = useState('25%');

  const toggleWidth = () => {
    setFirstComponentWidth(firstComponentWidth === '25%' ? '0%' : '25%');
  };
  return (
    <div className="App"  style={{ display: 'flex', height: '100vh' }}>
      <div  style={{backgroundColor: '#ddd', width:firstComponentWidth,height:'100vh', padding: '20px', boxSizing: 'content-box', transition:'1s'}}>
        <Cases data={data} setData={setData} id={id} setId={setId} />
      </div>
      <div style={{backgroundColor: 'rgb(198 198 218)', width:`calc(100% - ${firstComponentWidth})`,height:'100vh'}}>
        <div style={{backgroundColor: '#ccc', width:'20px',height:'100%', position: 'absolute'}}  onClick={toggleWidth}/>
        <div style={{margin: '0 0 0 20px', padding: '20px', wordWrap: 'break-word'}}>
          <Main style={{backgroundColor: '#f0f', margin: '100px'}} id={id} />
        </div>
      </div>
    </div>
  );
}

export default App;
