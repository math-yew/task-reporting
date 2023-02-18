import React, { useState, useEffect } from 'react';

function ActionStepsTaken (props){
  const {actionStepsTaken, setActionStepsTaken} = props;

  const [input, setInput] = useState("");
  const [dragging,setDragging] = useState(null);
  const [eclipsing,setEclipsing] = useState(null);
  const [hoverColor,setHoverColor] = useState("#ffffff");

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

  const startDrag = (e, index) => {
    setDragging(index)
    setHoverColor("#aaffaa");
  }

  const dropDrag = (e) =>{
    let to = eclipsing;
    let from = dragging;
    setHoverColor("#ffffff");
    if(to != null  && from != null){
      let arr = actionStepsTaken;
      to = (from >= to) ? to : to + 1;
      let toRemove = (from >= to) ? from +1 : from;
      arr.splice(to, 0, arr[from]);
      arr.splice(toRemove,1);
      setActionStepsTaken(arr);
    }
  };

  return (
    <div style={{display:'flex', flexFlow: 'column wrap', alignItems: 'center'}}>
      <h3>Action StepsTaken</h3>
      <ul style={{listStyleType: 'none'}}>
        {
            (actionStepsTaken || []).map((item, index) => (
              <li key={index}
                style = {{margin: "5px"}}
                draggable
                onDragStart={(e)=>startDrag(e, index)}
                onDragOver={(e)=>setEclipsing(index)}
                onDragLeave={()=>setEclipsing(null)}
                onDragEnd={()=>dropDrag()}
              >
                <input
                  style = {{margin: "0px", borderRadius: "5px",  transition: ".3s", backgroundColor:(eclipsing == index) ? hoverColor : "#ffffff", border:(eclipsing == index) ? "solid thin #dfd" : "solid thin #555"}}
                  type="text"
                  value={item}
                  onChange={(e) => updateActionStepsTaken(e, index)}
                />
                <span style={{ color: '#a00', fontWeight: 'bold', marginLeft:'15px'}} onClick={()=>removeActionStepsTaken(index)}>X</span>
              </li>
            ))
        }
        <li>
          <form onSubmit={addActionStepsTaken}>
            <input
              style = {{margin: "5px"}}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </li>
      </ul>
    </div>
  )
}

export {ActionStepsTaken};
