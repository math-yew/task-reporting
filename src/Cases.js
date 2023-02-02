import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Cases = (props) => {

  let { data, setData, id, setId } = props;

  useEffect(() => {
    axios.get('http://localhost:3003/data')
      .then(res => {
        setData(res.data);
        // setId(res.data._id);
        }
      );
  }, []);

  return (
    <div style={{ display: 'block'}}>
      <h1>Cases</h1>
      <div  style={{ display: 'flex', width: '100%', justifyContent: 'right'}}>
        <div  style={{backgroundColor:'#afa', color: '#0a0', height: '50px', width: '50px', borderRadius: '50px', textAlign: 'center', justifyContent: 'center', fontSize:'50px', lineHeight: '40px'}} onClick={()=>{setId(null)}}>+</div>
      </div>
      <div  style={{ width: '100%'}}>
        {data.map((job, i)=>(
          <div key={i} style={{backgroundColor:'#aaf'}} onClick={()=>setId(job._id)}>
            <p>{job._id}</p>
            <p>{job.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cases;
