import React, { useState, useEffect } from 'react';
import Service from './Service';


const Cases = (props) => {

  let { data, setData, id, setId } = props;
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    Service.getAllCases(showArchived)
      .then(res => setData(res.data));
  }, [id, showArchived]);

  return (
    <div style={{ display: 'block'}}>
      <h1>Cases</h1>
      <input
        style={{transform: 'scale(1.5)', marginRight: '10px'}}
        type="checkbox"
        name="showArchived"
        checked={showArchived}
        onChange={() => setShowArchived(!showArchived)}
      />
      <label name="showArchived">Show Archived</label>
      <div  style={{ display: 'flex', width: '100%', justifyContent: 'right'}}>
        <div  style={{backgroundColor:'#a2ff9c', color: '#0a0', height: '50px', width: '50px',
        borderRadius: '50px', textAlign: 'center', justifyContent: 'center', fontSize:'50px',
        lineHeight: '40px', boxShadow: '0px 2px 7px #aaa'}} onClick={()=>{setId(null)}}>+</div>
      </div>
      <div  style={{ width: '100%'}}>
        {data.map((job, i)=>(
          <div className="caseCard" key={i} style={{backgroundColor:(job.archive) ? '#88d6d4' : '#e2fdff'}} onClick={()=>setId(job._id)}>
            <h3>{job.name}</h3>
            <p>{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cases;
