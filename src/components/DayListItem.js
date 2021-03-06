import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";


export default function DayListItem(props) {

  //boolean checks
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0,
  });

  function formatSpots() {
    return props.spots === 0 ? 'no spots remaining' 
      : props.spots === 1 ? `${props.spots} spot remaining` 
      : `${props.spots} spots remaining`;
  }

  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}