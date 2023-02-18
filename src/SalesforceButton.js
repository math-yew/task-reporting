import React, { useState, useEffect } from 'react';

function SalesforceButton (props){

  const { actionStepsTaken, nextSteps } = props;

  const copySalesforceText = () => {
    let textDiv = document.getElementById("salesforceText");
    textDiv.style.display = "block";
    let range = document.createRange();
    range.selectNode(textDiv);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    textDiv.style.display = "none";
  }

  return (
    <>
    <div style={{display: "none"}} id="salesforceText">
      <p>Action Steps Taken</p>
      <ul>
        {
          (actionStepsTaken || []).map((step, i) => (
            <li key={i}>{step}</li>
          ))
        }
      </ul>
      <br/>
      <p>Next Steps</p>
      <ul>
        {
          (nextSteps || []).map((step, i) => (
            <li key={i}>{step}</li>
          ))
        }
      </ul>
    </div>
    <button  onClick={()=>copySalesforceText()}>Saleforce Copy</button>
    </>
  )
}

export {SalesforceButton};
