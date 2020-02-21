import './styles.scss'
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import axios from "axios";

// import { action } from "@storybook/addon-actions";
import { useVisualMode } from "../../hooks/useVisualMode";

// States
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
  // get props
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function onAdd() {
    transition(CREATE);
  };

  function onSave(name, interviewer) {
    transition(SAVING);

    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview);

    axios
      .put(`/api/appointments/${props.id}`, {
        interview
      })
      .then((response) => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  function onEdit() {
    transition(EDIT);
  };

  function waitForConfirm() {
    transition(CONFIRM);
  }

  function onDelete(interview) {
    transition(DELETING, true);
    axios

      .delete(`/api/appointments/${props.id}`, {
        interview
      })
      .then((response) => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  };

  function onCancel() {
    back();
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === ERROR_SAVE && <Error message = "Could Not save appointment." onClose={onCancel}/>}
      {mode === ERROR_DELETE && <Error message = "Could Not delete appointment." onClose={onCancel}/>}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete your appointment?"
          onCancel={onCancel}
          onConfirm={onDelete} />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={waitForConfirm}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}

    </article>

  );
}