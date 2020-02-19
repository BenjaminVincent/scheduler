import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment"
import { getAppointmentsForDay } from "../helpers/selectors.js";


export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day =>
  setState({
    ...state,
    day
  });

const setDays = days =>
  setState(prev => ({
    ...prev,
    days
  }));


  useEffect(() => {
    axios
    .get('/api/days')
    .then(res => {
      setDays(res.data)})
    .catch((error) => {
      console.log(error.response.status);
    });
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
        setDay={setDay} />
      </nav>
      <img  
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      {getAppointmentsForDay(state, state.day).map(app =>
          <Appointment {...app} key={app.id} />
        )}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}


// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   }, 
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Benjamin Vincent",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png"
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Mike Thomerson",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png"
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "3pm",
//     interview: {
//       student: "Carl Winkleton",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg"
//       }
//     }
//   }
// ];