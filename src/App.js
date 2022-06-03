import activities from "./resources/schedule.json";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const currentDate = dayjs().format("DD MMMM");
  const tomorrowsDate = dayjs().add(1, "day").format("DD MMMM");
  dayjs.extend(isoWeek);

  const [todaysActivityList, setTodaysActivityList] = useState([]);
  const [tomorrowsActivityList, setTomorrowsActivityList] = useState([]);
  const [restOfWeekActivityList, setRestOfWeekActivityList] = useState([]);
  const [nextWeeksActivityList, setNextWeeksActivityList] = useState([]);
  const [futureActivityList, setFutureActivityList] = useState([]);

  function todaysActivities() {
    const activityGroup = activities.filter(
      (activity) => dayjs(activity.startTime).format("DD MMMM") === currentDate
    );
    setTodaysActivityList(activityGroup);
  }

  function tomorrowsActivities() {
    const activityGroup = activities.filter(
      (activity) =>
        dayjs(activity.startTime).format("DD MMMM") === tomorrowsDate
    );
    setTomorrowsActivityList(activityGroup);
  }

  function restOfWeekActivities() {
    const activityGroup = activities.filter(
      (activity) =>
        dayjs(activity.startTime).format("DD MMMM") !== currentDate &&
        dayjs(activity.startTime).format("DD MMMM") !== tomorrowsDate &&
        dayjs(activity.startTime).format("DD MMMM") >=
          dayjs().day(0).format("DD MMMM") &&
        dayjs(activity.startTime).format("DD MMMM") <=
          dayjs().day(6).format("DD MMMM")
    );
    setRestOfWeekActivityList(activityGroup);
  }

  function nextWeeksActivities() {
    const activityGroup = activities.filter(
      (activity) =>
        dayjs(activity.startTime).format("DD MMMM") >
          dayjs().day(6).format("DD MMMM") &&
        dayjs(activity.startTime).format("DD MMMM") <
          dayjs().day(13).format("DD MMMM")
    );

    setNextWeeksActivityList(activityGroup);
  }

  function futureActivities() {
    const activityGroup = activities.filter(
      (activity) =>
        dayjs(activity.startTime).format("DD MMMM") >
          dayjs().day(13).format("DD MMMM") || 
        dayjs(activity.startTime).format("DD MMMM") <
          dayjs().add(1, "month").format("DD MMMM") 
    );
    console.log(activityGroup);
    const futureActivityGroup = activityGroup.slice(0,5)
    setFutureActivityList(futureActivityGroup);
  }

  function todaysActivitiesComponent() {
    if (todaysActivityList.length !== 0) {
      return (
        <div>
          <h3>Today</h3>
          <ol className="list-unstyled">
            {todaysActivityList.map((activity) => {
              return (
                <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                  <header>{activity.title}</header>
                  <small className="text-muted">
                    {dayjs(activity.startTime).format("D MMM [at] H:mm")} •{" "}
                    {activity.instructor}
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

  function tomorrowsActivitiesComponent() {
    if (tomorrowsActivityList.length !== 0) {
      return (
        <div>
          <h3>Tomorrow</h3>
          <ol className="list-unstyled">
            {tomorrowsActivityList.map((activity) => {
              return (
                <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                  <header>{activity.title}</header>
                  <small className="text-muted">
                    {dayjs(activity.startTime).format("D MMM [at] H:mm")} •{" "}
                    {activity.instructor}
                  </small>
                </li>
              );
            })}
          </ol>
          <hr />
        </div>
      );
    }
  }

  function restOfWeekActivitiesComponent() {
    if (restOfWeekActivityList.length !== 0) {
      return (
        <div>
          <h3>This Week</h3>
          <ol className="list-unstyled">
            {restOfWeekActivityList.map((activity) => {
              return (
                <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                  <header>{activity.title}</header>
                  <small className="text-muted">
                    {dayjs(activity.startTime).format("ddd[,] D MMM [at] H:mm")} •{" "}
                    {activity.instructor}
                  </small>
                </li>
              );
            })}
          </ol>
          <hr />
        </div>
      );
    }
  }

  function nextWeeksActivitiesComponent() {
    if (nextWeeksActivityList.length !== 0) {
      return (
        <div>
          <h3>Next Week</h3>
          <ol className="list-unstyled">
            {nextWeeksActivityList.map((activity) => {
              return (
                <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                  <header>{activity.title}</header>
                  <small className="text-muted">
                    {dayjs(activity.startTime).format(
                      "ddd[,] DD MMM [at] H:mm"
                    )}{" "}
                    • {activity.instructor}
                    {}
                  </small>
                </li>
              );
            })}
          </ol>
          <hr />
        </div>
      );
    }
  }

  function futureActivitiesComponent() {
    if (futureActivityList.length !== 0) {
      return (
        <div>
          <h3>Future</h3>
          <ol className="list-unstyled">
            {futureActivityList.map((activity) => {
              return (
                <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                  <header>{activity.title}</header>
                  <small className="text-muted">
                    {dayjs(activity.startTime).format("D MMM [at] H:mm")} •{" "}
                    {activity.instructor}
                  </small>
                </li>
              );
            })}
          </ol>
          <hr />
        </div>
      );
    }
  }

  useEffect(() => {
    todaysActivities();
    tomorrowsActivities();
    restOfWeekActivities();
    nextWeeksActivities();
    futureActivities();
  }, []);

  return (
    <div className="container p-3">
      <h1 className="mb-5">Schedule</h1>
      <div className="row">
        <div className="col-lg-6 col-md-8">
          <h3 className="fs-6">Showing all</h3>

          {todaysActivitiesComponent()}
          {tomorrowsActivitiesComponent()}
          {restOfWeekActivitiesComponent()}
          {nextWeeksActivitiesComponent()}
          {futureActivitiesComponent()}
        </div>
      </div>
    </div>
  );
}

export default App;
