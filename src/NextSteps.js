import React, { useState, useEffect } from 'react';

function NextSteps (props){
  const {nextSteps, setNextSteps} = props;

  const [input, setInput] = useState("");
  const [dragging,setDragging] = useState(null);
  const [eclipsing,setEclipsing] = useState(null);
  const [hoverColor,setHoverColor] = useState("#ffffff");

  const addNextSteps = (e) => {
    e.preventDefault();
    setNextSteps([...nextSteps, input]);
    setInput("");
  };

  const updateNextSteps = (e, index) => {
    let newNextSteps = [...nextSteps];
    newNextSteps[index] = e.target.value;
    setNextSteps(newNextSteps);
  };

  const removeNextSteps = (index) => {
    let newNextSteps = [...nextSteps];
    newNextSteps.splice(index, 1);
    setNextSteps(newNextSteps);
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
      let arr = nextSteps;
      to = (from >= to) ? to : to + 1;
      let toRemove = (from >= to) ? from +1 : from;
      arr.splice(to, 0, arr[from]);
      arr.splice(toRemove,1);
      setNextSteps(arr);
    }
  };

  return (
    <div style={{display:'flex', flexFlow: 'column wrap', justifyContent: 'left'}}>
      <h3>Next Steps</h3>
      <ul style={{listStyleType: 'none', width: '100%'}}>
        {
            (nextSteps || []).map((item, index) => (
              <li key={index}
                style = {{margin: "5px"}}
                draggable
                onDragStart={(e)=>startDrag(e, index)}
                onDragOver={(e)=>setEclipsing(index)}
                onDragLeave={()=>setEclipsing(null)}
                onDragEnd={()=>dropDrag()}
              >
                <input
                  style = {{margin: "0px", width: '80%', transition: ".3s", backgroundColor:(eclipsing == index) ? hoverColor : "#ffffff", border:(eclipsing == index) ? "solid thin #dfd" : "solid thin #555"}}
                  type="text"
                  value={item}
                  onChange={(e) => updateNextSteps(e, index)}
                />
                <span style={{ color: '#a00', fontWeight: 'bold', marginLeft:'15px'}} onClick={()=>removeNextSteps(index)}><i class="fa fa-trash"></i></span>
              </li>
            ))
        }
        <li>
          <form onSubmit={addNextSteps}>
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

export {NextSteps};
