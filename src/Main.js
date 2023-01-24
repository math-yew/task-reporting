import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3003/data')
      .then(res => setData(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = { name: e.target.name.value, orderFromSun: e.target.rank.value };
    console.log("newData:" + newData);
    axios.post('http://localhost:3003/data', newData)
      .then(res => setData([...data, res.data]));
  }

  const handleUpdate = (id, newData) => {
    console.log("id: " + id);
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
    <div>
      <p>{JSON.stringify(data)}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="text" name="rank" placeholder="Rank" />
        <button type="submit">Save</button>
      </form>
      <ul>
        {data.map(item => (
          <li key={item._id}>
            <p>{item.name}</p>
            <p>{item.orderFromSun}</p>
            <button onClick={() => handleUpdate(item._id, { name: 'Pluto' })}>Update</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Main;
