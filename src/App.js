import activities from "./resources/schedule.json";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function App() {
  const today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const lastDay = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 6)
  );

  var nextWeekBegin = new Date(lastDay + 1);
  nextWeekBegin.setDate(lastDay.getDate() + 1);

  var nextWeekEnd = new Date(lastDay + 1);
  nextWeekEnd.setDate(nextWeekBegin.getDate() + 6);

  const [todaysActivities, setTodaysActivities] = useState([]);
  const [tomorrowsActivities, setTomorrowsActivities] = useState([]);
  const [restofFirstWeekActivities, setRestofFirstWeekActivities] = useState(
    []
  );
  const [nextWeekActivities, setNextWeekActivities] = useState([]);
  const [futureActivities, setFutureActivities] = useState([]);

  // const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));

  useEffect(() => {
    setTodaysActivities(
      activities.filter(
        (a) =>
          dayjs(a.startTime).format("d MMM") ===
          dayjs(today.toISOString()).format("d MMM")
      )
    );

    setTomorrowsActivities(
      activities.filter(
        (a) =>
          dayjs(a.startTime).format("d MMM") ===
          dayjs(tomorrow.toISOString()).format("d MMM")
      )
    );

    setRestofFirstWeekActivities(
      activities.filter(
        (a) =>
          new Date(a.startTime).getTime() > tomorrow.getTime() &&
          new Date(a.startTime).getTime() < lastDay.getTime()
      )
    );

    setNextWeekActivities(
      activities.filter(
        (a) =>
          new Date(a.startTime).getTime() > lastDay.getTime() &&
          new Date(a.startTime).getTime() < nextWeekEnd.getTime()
      )
    );

    setFutureActivities(
      activities.filter(
        (a) => new Date(a.startTime).getTime() > nextWeekEnd.getTime()
      )
    );
  }, []);

  console.log(restofFirstWeekActivities);

  return (
    <div className="container p-3">
      <h1 className="mb-5">Schedule</h1>
      <div className="row">
        <div className="col-lg-6 col-md-8">
          <ul className="list-unstyled">
            <h2 className="fs-6">Today</h2>
            <hr />
            {todaysActivities.length > 0 &&
              todaysActivities.map((activity) => (
                <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                  <header>{activity.title}</header>
                  <small className="text-muted">
                    {dayjs(activity.startTime).format("D MMM [at] H:mm")} •{" "}
                    {activity.instructor}
                  </small>
                </li>
              ))}
          </ul>
          <ul className="list-unstyled">
            <h2 className="fs-6">Tomorrow</h2>
            <hr />
            {tomorrowsActivities.length > 0 &&
              tomorrowsActivities.map((activity) => (
                <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                  <header>{activity.title}</header>
                  <small className="text-muted">
                    {dayjs(activity.startTime).format("D MMM [at] H:mm")} •{" "}
                    {activity.instructor}
                  </small>
                </li>
              ))}
          </ul>
          {restofFirstWeekActivities.length > 0 &&
            restofFirstWeekActivities.map((activity) => (
              <ul className="list-unstyled">
                <h2 className="fs-6">
                  {dayjs(activity.startTime).format("ddd, MMM DD  ")} •{" "}
                </h2>
                <hr />
                <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                  <header>{activity.title}</header>
                  <small className="text-muted">
                    {dayjs(activity.startTime).format("D MMM [at] H:mm")} •{" "}
                    {activity.instructor}
                  </small>
                </li>
              </ul>
            ))}
          <ul className="list-unstyled">
            <h2 className="fs-6">Next week</h2>
            <hr />
            {nextWeekActivities.length > 0 &&
              nextWeekActivities.map((activity) => (
                <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                  <header>{activity.title}</header>
                  <small className="text-muted">
                    {dayjs(activity.startTime).format("ddd, MMM DD  ")} •{" "}
                    {activity.instructor}
                  </small>
                </li>
              ))}
          </ul>
          <ul className="list-unstyled">
            <h2 className="fs-6">In future</h2>
            <hr />
            {futureActivities.length > 0 &&
              futureActivities.slice(0, 5).map((act) => (
                <li className="hover-light-bg p-2 rounded-2" key={act.id}>
                  <small className="text-muted">
                    {dayjs(act.startTime).format("ddd, MMM DD  ")} •{" "}
                    {act.instructor}
                  </small>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
