
export function getAppointmentsForDay (state, day) {
  const fetchedApp = [];
  const dayObj = state.days.filter(d => d.name === day)[0];
  if (state.days < 1) {
    return [];
  }

  if (!dayObj) {
    return [];
  }

  for (const key of dayObj.appointments) {
    if (state.appointments[key]) {
      fetchedApp.push(state.appointments[key]);
    }
  }
  return fetchedApp;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return { 
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
}



