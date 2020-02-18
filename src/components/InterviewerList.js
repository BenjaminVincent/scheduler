import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";



export default function InterviewerList(props) {
  const {interviewers, interviewer, setInterviewer} = props;

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {
    interviewers.map((inter, key) =>
      <InterviewerListItem 
      avatar={inter.avatar}
      name={inter.name}
      selected={inter.id === props.value}
      setInterviewer={event => props.onChange(inter.id)}
      key={key}
       />
    )
  }
  </ul>
  </section>
  );
};