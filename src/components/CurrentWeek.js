import React from "react";
import DaySchedule from "./DaySchedule";
import RestOfWeek from "./RestOfWeek";

const CurrentWeek = ({ sortedSchedule }) => {
  var dateSet = new Set();
  sortedSchedule.currentWeek.map((activity) => {
    var activityDate = new Date(activity.startTime);

    dateSet.add(activityDate.toDateString());
    return false;
  });

  return (
    <div>
      <DaySchedule title={"Today"} activities={sortedSchedule.today} />
      <DaySchedule title={"Tomorrow"} activities={sortedSchedule.tomorrow} />
      <RestOfWeek activities={sortedSchedule.currentWeek} dateSet={dateSet} />
    </div>
  );
};


export default CurrentWeek;
