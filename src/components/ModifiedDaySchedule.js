import React from "react";
import { formatDate } from "../helper functions/dateFormat";
import dayjs from "dayjs";

const ModifiedDaySchedule = ({ date, activities }) => {
  var dateDet = new Date(date);
  return (
    <div className="col-lg-6 col-md-8">
      <h2 className="fs-6">
        {dateDet.toLocaleString("default", { weekday: "short" }) +
          " " +
          dateDet.getDate() +
          " " +
          dateDet.toLocaleString("default", { month: "short" })}
      </h2>
      <ol>
        {activities.map((activity) => {
          const { id, title, startTime, instructor } = activity;
          if (formatDate(dateDet) === formatDate(new Date(startTime))) {
            return (
              <li className="hober-light0bg p-2 rounded-2" key={id}>
                <header>{title}</header>
                <small className="text-muted">
                  {dayjs(startTime).format("D MMM [at] H:mm")} .{""}
                  {instructor}
                </small>
              </li>
            );
          }
          else return ""
        })}
      </ol>
    </div>
  );
};

export default ModifiedDaySchedule;
