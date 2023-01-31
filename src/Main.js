import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tasks } from './Tasks';

const Main = () => {

  let initialDays = {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: ""
  };
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [days, setDays] = useState(initialDays);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:3003/dataOne')
      .then(res => {
        setData(res.data);
        setId(res.data._id);
        setDays(res.data.days);
        setTasks(res.data.tasks);
        }
      );
  }, []);

  const changeDays = (e) => {
    const { name, value } = e.target;
    setDays((prevState) => ({ ...prevState, [name]: value }));
};

  const changeField = (e) => {
    const { name, value } = e.target;
    switch(name){
      case 'name':
        setName(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    let readyData = {
      name: name,
      description: description,
      startDate: null,
      actionStepsTaken: [],
      nextSteps: [],
      addedToSalesforce: false,
      addedToSlack: false,
      days: days,
      addedToTimecard: false,
      tasks: [...tasks],
      notes:""
    };

    if(!!id){
      axios.put(`http://localhost:3003/data/${id}`, readyData)
        .then(res => {
          const updatedData = data.map(item => item._id === id ? res.data : item);
          setData(updatedData);
        });
    }else {
      axios.post('http://localhost:3003/data', readyData)
      .then(res => setData([...data, res.data]));
    }
  }

  const handleUpdate = (id, newData) => {
    axios.put(`http://localhost:3003/data/${id}`, newData)
      .then(res => {
        const updatedData = data.map(item => item._id === id ? res.data : item);
        setData(updatedData);
      });
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3003/data/${id}`)
      .then(res => {
        const updatedData = data.filter(item => item._id !== id);
        setData(updatedData);
      });
  }

  return (
    <>
      <p>{JSON.stringify(data)}</p>
      <p>{JSON.stringify(days)}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={data.name ||""} onChange={(e)=>changeField(e)} />
        <input type="text" name="description" placeholder="Description" value={data.description ||""} onChange={(e)=>changeField(e)} />
        <Days days={days || initialDays} changeDays={changeDays} />
        <button type="submit">Save</button>
      </form>
      <p>{data.name}</p>
      <Tasks tasks={tasks} setTasks={setTasks} />
    </>
  );
};

function Days (props){
  let { days } = props;
  return(
    <>
      <p>{JSON.stringify(props)}</p>
      <input type="text" name="monday" placeholder="Mon" value={days.monday||""} onChange={(e)=>props.changeDays(e)} />
      <input type="text" name="tuesday" placeholder="Mon" value={days.tuesday||""} onChange={(e)=>props.changeDays(e)} />
    </>
  )
}

export default Main;
