import activities from "./resources/schedule.json";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";

function SortedActivityListComponent({ activityList, title }) {
  if (activityList.length !== 0) {
    return (
      <div>
        <h3>{title}</h3>
        <ol className="list-unstyled">
          {activityList.map((activity) => {
            return (
              <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                <header>{activity.title}</header>
                <small className="text-muted">
                  {dayjs(activity.startTime).format("D MMM [at} H:mm") >
                  dayjs().add(14, "day").format("D MMM [at]H:mm")
                    ? dayjs(activity.startTime).format("ddd[,] D MMM [at] H:mm")
                    : dayjs(activity.startTime).format("D MMM [at] H:mm")}{" "}
                  • {activity.instructor}
                </small>
              </li>
            );
          })}
        </ol>
        <hr />
      </div>
    );
  } else return;
}

function App() {
  const currentDate = dayjs().format("DD MMMM YYYY");
  const tomorrowsDate = dayjs().add(1, "day").format("DD MMMM YYYY");

  const [todaysActivityList, setTodaysActivityList] = useState([]);
  const [tomorrowsActivityList, setTomorrowsActivityList] = useState([]);
  const [restOfWeekActivityList, setRestOfWeekActivityList] = useState([]);
  const [nextWeeksActivityList, setNextWeeksActivityList] = useState([]);
  const [futureActivityList, setFutureActivityList] = useState([]);

  function sortActivitiesIntoGroups() {
    const todaysActivities = activities.filter(
      (activity) =>
        dayjs(activity.startTime).format("DD MMMM YYYY") === currentDate
    );
    const tomorrowsActivities = activities.filter(
      (activity) =>
        dayjs(activity.startTime).format("DD MMMM YYYY") === tomorrowsDate
    );
    const restOfWeekActivities = activities.filter(
      (activity) =>
        dayjs(activity.startTime).format("DD MMMM YYYY") >=
          dayjs().day(2).format("DD MMMM YYYY") &&
        dayjs(activity.startTime).format("DD MMMM YYYY") <=
          dayjs().day(6).format("DD MMMM YYYY")
    );
    const nextWeeksActivities = activities.filter(
      (activity) =>
        dayjs(activity.startTime).format("DD MMMM YYYY") >
          dayjs().day(6).format("DD MMMM YYYY") &&
        dayjs(activity.startTime).format("DD MMMM YYYY") <
          dayjs().day(13).format("DD MMMM YYYY")
    );
    const activityGroup = activities
      .filter(
        (activity) =>
          dayjs(activity.startTime).format("DD MMMM YYYY") >
            dayjs().day(13).format("DD MMMM YYYY") ||
          dayjs(activity.startTime).format("DD MMMM YYYY") <
            dayjs().add(1, "month").format("DD MMMM YYYY")
      )
      .slice(0, 5);

    setTodaysActivityList(todaysActivities);
    setTomorrowsActivityList(tomorrowsActivities);
    setRestOfWeekActivityList(restOfWeekActivities);
    setNextWeeksActivityList(nextWeeksActivities);
    setFutureActivityList(activityGroup);
  }

  useEffect(() => {
    sortActivitiesIntoGroups();
  }, []);

  return (
    <div className="container p-3">
      <h1 className="mb-5">Schedule</h1>
      <div className="row">
        <div className="col-lg-6 col-md-8">
          <h3 className="fs-6">Showing all</h3>
          <SortedActivityListComponent
            activityList={todaysActivityList}
            title="Today"
          />
          <SortedActivityListComponent
            activityList={tomorrowsActivityList}
            title="Tomorrow"
          />
          <SortedActivityListComponent
            activityList={restOfWeekActivityList}
            title="This week"
          />
          <SortedActivityListComponent
            activityList={nextWeeksActivityList}
            title="Next week"
          />
          <SortedActivityListComponent
            activityList={futureActivityList}
            title="In future..."
          />
        </div>
      </div>
    </div>
  );
}

export default App;
