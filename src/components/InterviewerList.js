import React from 'react';
import './InterviewerList.scss';
import InterviewerListItem from './InterviewerListItem';
import PropTypes from 'prop-types';


export default function InterviewerList(props) {
  const {interviewers, value, onChange} = props;

  return (
    <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {
      interviewers.map((inter, key) =>
        <InterviewerListItem 
        avatar={inter.avatar}
        name={inter.name}
        selected={inter.id === value}
        setInterviewer={event => onChange(inter.id)}
        key={key}
        />
    )
  }
  </ul>
  </section>
  );
};

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};