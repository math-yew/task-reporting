function Checkmarks (props){
  let { inSalesforce, setInSalesforce, inTimecard, setInTimecard, inSlack, setInSlack, days } = props;
  return(
    <div style={{}}>
      <input
        style={{transform: 'scale(1.5)', marginRight: '0px'}}
        type="checkbox"
        name="inSalesforce"
        checked={inSalesforce || false}
        onChange={() => setInSalesforce(!inSalesforce)}
      />
      <label name="archive">Salesforce</label>
      <br/>

      <input
        style={{transform: 'scale(1.5)', marginRight: '0px'}}
        type="checkbox"
        name="inTimecard"
        checked={inTimecard || false}
        onChange={() => setInTimecard(!inTimecard)}
      />
      <label name="archive">Timecard</label>
      <br/>

      <input
        style={{transform: 'scale(1.5)', marginRight: '0px'}}
        type="checkbox"
        name="inSlack"
        checked={inSlack || false}
        onChange={() => setInSlack(!inSlack)}
      />
      <label name="archive">Slack</label>
    </div>
  )
}

export {Checkmarks};
