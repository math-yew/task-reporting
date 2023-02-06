function Days (props){
  let { days } = props;
  return(
    <div style={{display:'flex', flexDirection:'row'}}>
      <div className="dayInput">
        <label name="monday">Mon</label>
        <input className="day" type="text" name="monday" placeholder="" value={days.monday||""} onChange={(e)=>props.changeDays(e)} />
      </div>
      <div className="dayInput">
        <label name="tuesday">Tues</label>
        <input className="day" type="text" name="tuesday" placeholder="" value={days.tuesday||""} onChange={(e)=>props.changeDays(e)} />
      </div>
      <div className="dayInput">
        <label name="wednesday">Wed</label>
        <input className="day" type="text" name="wednesday" placeholder="" value={days.wednesday||""} onChange={(e)=>props.changeDays(e)} />
      </div>
      <div className="dayInput">
        <label name="thursday">Thur</label>
        <input className="day" type="text" name="thursday" placeholder="" value={days.thursday||""} onChange={(e)=>props.changeDays(e)} />
      </div>
      <div className="dayInput">
        <label name="friday">Fri</label>
        <input className="day" type="text" name="friday" placeholder="" value={days.friday||""} onChange={(e)=>props.changeDays(e)} />
      </div>
      <div className="dayInput">
        <label name="saturday">Sat</label>
        <input className="day" type="text" name="saturday" placeholder="" value={days.saturday||""} onChange={(e)=>props.changeDays(e)} />
      </div>
      <div className="dayInput">
        <label name="sunday">Sun</label>
        <input className="day" type="text" name="sunday" placeholder="" value={days.sunday||""} onChange={(e)=>props.changeDays(e)} />
      </div>
    </div>
  )
}

export {Days};
