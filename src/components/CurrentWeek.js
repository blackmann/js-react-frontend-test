import dayjs from "dayjs";
import React from "react";
import DaySchedule from "./DaySchedule";
import RestOfWeek from "./RestOfWeek";

const CurrentWeek = ({ sortedSchedule }) => {
  var dateSet = new Set();
  sortedSchedule.currentWeek.forEach((activity) => {
    var activityDate = dayjs(activity.startTime).toDate();
    dateSet.add(activityDate);
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
