import React, { useState, useEffect } from 'react';

function Tasks (props){
  const {tasks, setTasks} = props;
  const [input, setInput] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { task: input, completed: false }]);
    setInput("");
  };

  const toggleComplete = (index) => {
    let newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const updateTask = (e, index) => {
    let newTasks = [...tasks];
    newTasks[index].task = e.target.value;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  return (
    <div style={{display:'flex', flexFlow: 'column wrap', alignItems: 'center'}}>
      <h3>Tasks</h3>
      <ul style={{listStyleType: 'none'}}>
        {
            (tasks || []).map((item, index) => (
              <li key={index}>
                <input
                  style={{transform: 'scale(1.5)', marginRight: '10px'}}
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                />
                <input
                  type="text"
                  value={item.task}
                  onChange={(e) => updateTask(e, index)}
                />
                <span style={{ color: '#a00', fontWeight: 'bold', marginLeft:'15px'}} onClick={()=>removeTask(index)}> X</span>
              </li>
            ))
        }
        <li>
          <form onSubmit={addTask}>
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

export {Tasks};
