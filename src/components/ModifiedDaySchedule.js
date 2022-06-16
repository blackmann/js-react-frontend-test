import React from "react";
import dayjs from "dayjs";

const ModifiedDaySchedule = ({ date, activities }) => {
   date = dayjs(date);
  return (
    <div className="col-lg-6 col-md-8">
      <h2 className="fs-6">
        {date.format('ddd') +
          " " +
          date.date() +
          " " +
          date.format('MMM')}
      </h2>
      <ol  className="list-unstyled">
        {activities.map((activity) => {
          const { id, title, startTime, instructor } = activity;
          if(dayjs(date).format("MDYYYY") === dayjs(startTime).format("MDYYYY")) {
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
