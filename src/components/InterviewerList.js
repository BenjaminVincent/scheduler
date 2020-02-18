import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";



export default function InterviewerList(props) {
  const {interviewers, interviewer, setInterviewer} = props;
  // console.log(interviewers);
  console.log(setInterviewer);
  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {
    interviewers.map((inter, key) =>
      <InterviewerListItem
      id={inter.id} 
      avatar={inter.avatar}
      name={inter.name}
      selected={interviewer === inter.id}
      setInterviewer={setInterviewer}
      key={key}
       />
    )
  }
        </ul>
    </section>
  );
};