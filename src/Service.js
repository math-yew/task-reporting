import axios from 'axios';

const Service = {

  getAllCases: async function(showArchived){
    let result;
    await axios.get(`http://localhost:3003/cases/${showArchived}`)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  getCase: async function(id){
    let result;
    await axios.get(`http://localhost:3003/data/${id}`)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  updateCase: async function(id, readyData){
    let result;
    await axios.put(`http://localhost:3003/data/${id}`, readyData)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  postCase: async function(readyData){
    let result;
    axios.post('http://localhost:3003/data', readyData)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  },

  deleteCase: async function(id){
    let result;
    axios.delete(`http://localhost:3003/data/${id}`)
      .then(res => result = res)
      .catch((err)=>result = err);
      return result;
  }
}

export default Service;
