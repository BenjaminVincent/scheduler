import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";



export default function InterviewerListItem(props) {

  const nameSelected = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });
  
  return (
    // {dayClass} onClick={() => props.setDay(props.name)}
    
    <li className={nameSelected} onClick={() => props.setInterviewer(props.name)}>
      <img
        className="interviewers__item-image"
        id={props.id}
        src={props.avatar}
        alt={props.name}
        />
       { props.selected ? props.name : '' }
    </li>
  )
}