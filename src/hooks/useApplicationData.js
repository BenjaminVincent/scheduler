import { useState, useEffect } from "react";
import axios from "axios";


// Action types

const SET_DAY = 'SET_DAY';

export default function useApplicationData (initial) {
  // GO ----------------------------------------------------
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interview: {}
  });
  
  const setDay = day =>
  setState({
    ...state,
    day
  });
  
  // GO ----------------------------------------------------
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({
      ...state,
      appointments
    });
  }

  useEffect(() => {
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

  return {state, setState, setDay, bookInterview};
};

