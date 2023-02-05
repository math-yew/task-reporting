import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Cases = (props) => {

  let { data, setData, id, setId } = props;
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3003/cases/${showArchived}`)
      .then(res => {
        setData(res.data);
        }
      );
  }, [id, showArchived]);

  return (
    <div style={{ display: 'block'}}>
      <p>{showArchived.toString()}</p>
      <input
        style={{transform: 'scale(1.5)', marginRight: '10px'}}
        type="checkbox"
        name="showArchived"
        checked={showArchived}
        onChange={() => setShowArchived(!showArchived)}
      />
      <label name="showArchived">Show Archived</label>
      <h1>Cases</h1>
      <div  style={{ display: 'flex', width: '100%', justifyContent: 'right'}}>
        <div  style={{backgroundColor:'#afa', color: '#0a0', height: '50px', width: '50px',
        borderRadius: '50px', textAlign: 'center', justifyContent: 'center', fontSize:'50px',
        lineHeight: '40px', boxShadow: '0px 2px 7px #aaa'}} onClick={()=>{setId(null)}}>+</div>
      </div>
      <div  style={{ width: '100%'}}>
        {data.map((job, i)=>(
          <div key={i} style={{backgroundColor:(job.archive) ? '#889' : '#aaf', padding: '10px', boxSizing: 'content-box', margin: '10px'}} onClick={()=>setId(job._id)}>
            <p>{job.name}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cases;
