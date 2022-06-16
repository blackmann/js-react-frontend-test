import React from "react";
import ModifiedDaySchedule from "./ModifiedDaySchedule";

const RestOfWeek = ({ activities, dateSet }) => {
  var dateArr = Array.from(dateSet);
  if(dateArr.length>0){
    return (
      <div>
        {dateArr.map((date)=><ModifiedDaySchedule date={date} activities={activities} key={date}/>)}
      </div>
    );
  }
  else{
    return <div></div>
  }
};

export default RestOfWeek;
