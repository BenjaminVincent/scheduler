import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment"
import { getAppointmentsForDay, getInterview, getInterviewerForDay } from "../helpers/selectors.js";




export default function Application(props) {
  

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interview: {}
  });

  const setDay = day =>
  setState({
    ...state,
    day
  });
  
  function bookInterview(id, interview) {
    console.log(id, interview);
  }


  const app = getAppointmentsForDay(state, state.day).map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewerForDay(state, state.day);
 
    return (
      <Appointment 
        {...appointment} 
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        key={appointment.id}
         />
    );
  });



  useEffect(() => {
    // updated to set promises retreive from /api's
    const getDays = axios.get('api/days');
    const getAppointments = axios.get('api/appointments');
    const getInterviewers = axios.get('api/interviewers');

    Promise.all([getDays, getAppointments, getInterviewers])
    .then(values => {
      setState(() => ({
        ...state, 
        days: values[0].data,
        appointments: values[1].data,
        interviewers: values[2].data
      }));
    })
    .catch(error => { 
      console.error(error.message)
    });
    
  }, []);
  
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
        setDay={setDay} />
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