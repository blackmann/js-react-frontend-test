import React from "react";
import dayjs from "dayjs";

const ModifiedDaySchedule = ({ date, activities }) => {

  return (
    <div className="col-lg-6 col-md-8">
      <h2 className="fs-6">
        {dayjs(date).format('ddd,D  MMMM')}
      </h2>
      <ol  className="list-unstyled">
        {activities.map((activity) => {
          const { id, title, startTime, instructor } = activity;
          if(dayjs(date).isSame(dayjs(startTime),'day')) {
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
          return null;
        })}
      </ol>
    </div>
  );
};

export default ModifiedDaySchedule;
