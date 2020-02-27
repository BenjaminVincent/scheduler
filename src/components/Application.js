import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment"
import { getAppointmentsForDay, getInterview, getInterviewerForDay } from "../helpers/selectors.js";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData();

  const app = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewerForDay(state, state.day);
 
    return (
      <Appointment 
        {...appointment} 
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        key={appointment.id}
         />
    );
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={state.days}
          day={state.day}
          setDay={setDay} 
        />
      </nav>
      <img  
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
       {app}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}