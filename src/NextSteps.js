import React, { useState, useEffect } from 'react';

function NextSteps (props){
  const {nextSteps, setNextSteps} = props;
  const [input, setInput] = useState("");

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

  return (
    <div style={{display:'flex', flexFlow: 'column wrap', alignItems: 'center'}}>
      <h3>NextSteps</h3>
      <ul style={{listStyleType: 'none'}}>
        {
            (nextSteps || []).map((item, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => updateNextSteps(e, index)}
                />
                <span style={{ color: '#a00', fontWeight: 'bold', marginLeft:'15px'}} onClick={()=>removeNextSteps(index)}> X</span>
              </li>
            ))
        }
        <li>
          <form onSubmit={addNextSteps}>
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

export {NextSteps};
