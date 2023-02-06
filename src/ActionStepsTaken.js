import React, { useState, useEffect } from 'react';

function ActionStepsTaken (props){
  const {actionStepsTaken, setActionStepsTaken} = props;
  const [input, setInput] = useState("");

  const addActionStepsTaken = (e) => {
    e.preventDefault();
    setActionStepsTaken([...actionStepsTaken, input]);
    setInput("");
  };

  const updateActionStepsTaken = (e, index) => {
    let newActionStepsTaken = [...actionStepsTaken];
    newActionStepsTaken[index] = e.target.value;
    setActionStepsTaken(newActionStepsTaken);
  };

  const removeActionStepsTaken = (index) => {
    let newActionStepsTaken = [...actionStepsTaken];
    newActionStepsTaken.splice(index, 1);
    setActionStepsTaken(newActionStepsTaken);
  };

  return (
    <div style={{display:'flex', flexFlow: 'column wrap', alignItems: 'center'}}>
      <h3>Action StepsTaken</h3>
      <ul style={{listStyleType: 'none'}}>
        {
            (actionStepsTaken || []).map((item, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateActionStepsTaken(e, index)}
                />
                <span style={{ color: '#a00', fontWeight: 'bold', marginLeft:'15px'}} onClick={()=>removeActionStepsTaken(index)}> X</span>
              </li>
            ))
        }
        <li>
          <form onSubmit={addActionStepsTaken}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {/*<button type="submit">+</button>*/}
          </form>
        </li>
      </ul>
    </div>
  )
}

export {ActionStepsTaken};
