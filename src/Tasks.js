import React, { useState, useEffect } from 'react';

function Tasks (props){
  let {tasks, setTasks} = props;
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
    <>
      <p>{JSON.stringify(tasks)}</p>
      <form onSubmit={addTask}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map((item, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(index)}
            />
            <input
              type="text"
              value={item.task}
              onChange={(e) => updateTask(e, index)}
            />
            {item.task}
            <span onClick={()=>removeTask(index)}>    X</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export {Tasks};
