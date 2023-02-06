import React, { useState, useEffect } from 'react';
import { Tasks } from './Tasks';
import { Days } from './Days';
import { ActionStepsTaken } from './ActionStepsTaken';
import { NextSteps } from './NextSteps';
import Service from './Service';

const Main = (props) => {

  const { id, setId } = props;

  let initialDays = {
    monday: "",
    tuesday: "",
    wednesday: "",
    thursday: "",
    friday: "",
    saturday: "",
    sunday: ""
  };

  let [data, setData] = useState([]);
  const [days, setDays] = useState(initialDays);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [actionStepsTaken, setActionStepsTaken] = useState([]);
  const [nextSteps, setNextSteps] = useState([]);
  const [archive, setArchive] = useState(false);
  const [inSalesforce, setInSalesforce] = useState(false);
  const [inTimecard, setInTimecard] = useState(false);
  const [inSlack, setInSlack] = useState(false);
  const [notes, setNotes] = useState(false);


  useEffect(() => {
    console.log("useEffect");
    if(!!id) {
      Service.getCase(id)
      .then(res => {
        setData(res.data);
        setDays(res.data.days);
        setTasks(res.data.tasks);
        setActionStepsTaken(res.data.actionStepsTaken);
        setNextSteps(res.data.nextSteps);
        setName(res.data.name);
        setDescription(res.data.description);
        setStartDate(res.data.startDate);
        setArchive(res.data.archive);
        setInSalesforce(res.data.inSalesforce);
        setInTimecard(res.data.inTimecard);
        setInSlack(res.data.inSlack);
        setNotes(res.data.notes);
        }
      );
    } else {
      setData(null);
      setDays(initialDays);
      setTasks([]);
      setActionStepsTaken([]);
      setNextSteps([]);
      setName("");
      setDescription("");
      setStartDate(null);
      setArchive(false);
      setInSalesforce(false);
      setInTimecard(false);
      setInSlack(false);
      setNotes("");
    }
  }, [id]);

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

  let dataStructure = {
    name: name,
    description: description,
    startDate: null,
    actionStepsTaken: [],
    nextSteps: [],
    inSalesforce: false,
    inTimecard: false,
    inSlack: false,
    days: {},
    tasks: [],
    notes:"",
    archive: false,
    notes: ""
  };


  const saveCase = (duplicate) => {
    let readyData = dataStructure;
    if(duplicate){
      readyData.tasks = nextSteps;
    } else {
      readyData.days = days;
      readyData.tasks = [...tasks];
      readyData.actionStepsTaken = [...actionStepsTaken];
      readyData.nextSteps = [...nextSteps];
      readyData.archive = archive;
      readyData.inSalesforce = inSalesforce;
      readyData.inTimecard = inTimecard;
      readyData.inSlack = inSlack;
      readyData.notes = notes;
  }

    if(!!id && !duplicate){
      Service.updateCase(id, readyData)
      .then((res)=>{
        if(res.status == '200') setId(id);
      });
    }else {
      readyData.startDate = new Date();
      console.log(readyData.startDate);
      Service.postCase(readyData)
      .catch(err => console.log(err));
    }
  }

  const handleDelete = () => {
    Service.deleteCase(id)
      .then(res => setId(id));
  }

  return (
    <>
      <p>date: {startDate}</p>
      <input type="text" name="name" placeholder="Name" value={name ||""} onChange={(e)=>changeField(e)} />
      <input type="text" name="description" placeholder="Description" value={description ||""} onChange={(e)=>changeField(e)} />
      <Days days={days || initialDays} changeDays={changeDays} />

      <input
        style={{transform: 'scale(1.5)', marginRight: '10px'}}
        type="checkbox"
        name="inSalesforce"
        checked={inSalesforce || false}
        onChange={() => setInSalesforce(!inSalesforce)}
      />
      <label name="archive">Salesforce</label>

      <input
        style={{transform: 'scale(1.5)', marginRight: '10px'}}
        type="checkbox"
        name="inTimecard"
        checked={inTimecard || false}
        onChange={() => setInTimecard(!inTimecard)}
      />
      <label name="archive">Timecard</label>

      <input
        style={{transform: 'scale(1.5)', marginRight: '10px'}}
        type="checkbox"
        name="inSlack"
        checked={inSlack || false}
        onChange={() => setInSlack(!inSlack)}
      />
      <label name="archive">Slack</label>

      <label>
        Notes:
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </label>

      <ActionStepsTaken actionStepsTaken={actionStepsTaken} setActionStepsTaken={setActionStepsTaken} />
      <NextSteps nextSteps={nextSteps} setNextSteps={setNextSteps} />
      <Tasks tasks={tasks} setTasks={setTasks} />


      <button  onClick={()=>saveCase()}>save</button>

      <button  onClick={()=>saveCase(true)}>Duplicate</button>
      <button  onClick={handleDelete}>Delete</button>

      <input
        style={{transform: 'scale(1.5)', marginRight: '10px'}}
        type="checkbox"
        name="archive"
        checked={archive || false}
        onChange={() => setArchive(!archive)}
      />
      <label name="archive">Archive</label>

    </>
  );
};



export default Main;
