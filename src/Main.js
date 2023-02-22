import React, { useState, useEffect } from 'react';
import { Tasks } from './Tasks';
import { Days } from './Days';
import { Checkmarks } from './Checkmarks';
import { ActionStepsTaken } from './ActionStepsTaken';
import { NextSteps } from './NextSteps';
import { SalesforceButton } from './SalesforceButton';
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
      <label name="name">Case:</label>
      <input style={{width:"100%"}} type="text" name="name" placeholder="Name" value={name ||""} onChange={(e)=>changeField(e)} />
      <label name="description">Description:</label>
      <input style={{width:"100%"}} type="text" name="description" placeholder="Description" value={description ||""} onChange={(e)=>changeField(e)} />
      <Days days={days || initialDays} changeDays={changeDays} />
      <div style={{width: "100%", display: "flex", flexFlow:"row"}}>
        <div style={{width:"50%", padding:"10px", boxSizing:"border-box"}}>
          <div style={{width:"100%", backgroundColor:"rgba(255,255,255,.5)", padding:"10px", boxSizing:"border-box"}}>
            <SalesforceButton actionStepsTaken={actionStepsTaken} nextSteps={nextSteps} />
            <ActionStepsTaken actionStepsTaken={actionStepsTaken} setActionStepsTaken={setActionStepsTaken} />
            <NextSteps nextSteps={nextSteps} setNextSteps={setNextSteps} />
          </div>
        </div>
        <div style={{width:"50%"}}>
          <div style={{width: "100%", display: "flex", flexFlow:"row"}}>
            <div style={{width:"50%"}}>
              <Checkmarks inSalesforce={inSalesforce} setInSalesforce={setInSalesforce}  inTimecard={inTimecard}  setInTimecard={setInTimecard}  inSlack={inSlack}  setInSlack={setInSlack} />
            </div>
            <div style={{width:"50%", display: "flex", justifyContent:"right"}}>
              <button  onClick={()=>saveCase()}>Save</button>
            </div>
          </div>
          <label>
            Notes: <br/>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </label>
          <br/>
          <Tasks tasks={tasks} setTasks={setTasks} />
        </div>
      </div>






      <br/><br/><br/>

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
