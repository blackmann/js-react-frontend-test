import React from "react";
import dayjs from "dayjs";

const ListedActivities = ({ title, activities }) => {
  if(activities.length>0){
    return (
      <div className="col-lg-6 col-md-8">
        <h2 className="fs-6">{title}</h2>
        <ol className="list-unstyled">
          {activities.map((activity) => {
            const { id, title, startTime, instructor } = activity;
            return (
              <li className="hover-light0bg p-2 rounded-2" key={id}>
                <header>{title}</header>
                <small className="text-muted">
                  {dayjs(startTime).format("D MMM [at] H:mm")} .{""}
                  {instructor}
                </small>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
  return null
};

export default ListedActivities;
