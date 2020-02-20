import './styles.scss'
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { action } from "@storybook/addon-actions";
import { useVisualMode } from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";


export default function Appointment(props) {
    // get props
    const { mode, transition, back} = useVisualMode(
      props.interview ? SHOW : EMPTY
    );

    function onAdd () {
      transition(CREATE);
    };

    function save(name, interviewer) {

      const interview = {
        student: name,
        interviewer
      };
      props.bookInterview(name, interview)
    }
  

    function onCancel() {
      back();
    };
  
  return (
      <article className="appointment">
        <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
          />
        )} 
        {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={onCancel}
        />
        )}
  
      </article>

  );
}