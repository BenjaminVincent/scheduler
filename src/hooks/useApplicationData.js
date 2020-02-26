import { useReducer, useEffect } from "react";
import { getSpotsForDay } from "helpers/selectors";
import axios from "axios";


// Action types
const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, ...action.value };
    case SET_APPLICATION_DATA:
      return { ...state, ...action.value };
    case SET_INTERVIEW: {
      const { id, interview, onUpdate } = action.value;
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };
      
      let updateModifier = (onUpdate === 'add' ? 1 : onUpdate === 'sub' ? -1 : 0 );
      let remaining = getSpotsForDay(state, state.day).length + updateModifier;

      const updateReamining = [...state.days].map(update => {
        if (update.name === state.day) {
          update = { ...update, spots: remaining };
        }
        return update;
      });
      
      return { ...state, appointments, days: updateReamining };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

export default function useApplicationData() {

  const [state, dispatch] = useReducer(reducer, { day: 'Monday', days: [], appointments: {}, interview: {} })
  const setDay = day => dispatch({ type: SET_DAY, value: { day } })

  const bookInterview = (id, interview) => {
    let update = 'edit';
    if (state.appointments[id].interview === null) {
      update = 'sub';
    }
    return axios
      .put(`api/appointments/${id}`, {
        interview
      })
      .then(() => dispatch({ 
        type: SET_INTERVIEW, value: { id, interview, onUpdate: update } 
      }));
  }

  function cancelInterview(interview, id) {
    return axios
      .delete(`api/appointments/${id}`, {
        interview
      })
      .then(() => dispatch({ type: SET_INTERVIEW, value: { id, interview: null, onUpdate: 'add' } }));
  };

  useEffect(() => {
    const getDays = axios.get('api/days');
    const getAppointments = axios.get('api/appointments');
    const getInterviewers = axios.get('api/interviewers');

    Promise.all([getDays, getAppointments, getInterviewers])
      .then(values => {
        dispatch({
          type: SET_APPLICATION_DATA,
          value: {
            days: values[0].data,
            appointments: values[1].data,
            interviewers: values[2].data
          }
        });
      }, [])
      .catch(error => {
        console.error(error.message)
      });

  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

