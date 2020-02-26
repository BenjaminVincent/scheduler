import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";


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

