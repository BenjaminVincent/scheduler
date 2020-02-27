import { getSpotsForDay } from "../helpers/selectors";


// Action types
const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

export default function reducer(state, action) {
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

export {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
}
