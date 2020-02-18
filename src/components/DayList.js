import React from "react";
import "./DayListItem.scss";
import DayListItem from "./DayListItem";



export default function DayList(props) {
  const {days, setDay} = props;
  return (
    <ul> 
      {
        days.map((day, key) => 
        <DayListItem 
          name={day.name} 
          spots={day.spots} 
          selected={day.name === props.day}
          setDay={setDay}
          key={key}  />)
      }
    </ul>
  );
};