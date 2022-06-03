import activities from "./resources/schedule.json";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function App() {
  const today = new Date();
  var tomorrow = new Date(today + 1);
  tomorrow.setDate(new Date().getDate() + 1);
  const lastDay = new Date(
    new Date().setDate(new Date().getDate() - new Date().getDay() + 6)
  );

  const [todaysActivities, setTodaysActivities] = useState([]);
  const [tomorrowsActivities, setTomorrowsActivities] = useState([]);
  const [nextWeekActivities, setNextWeekActivities] = useState([]);
  const [restOfActivities, setRestOfActivities] = useState([]);

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

    setNextWeekActivities(
      activities.filter(
        (a) => new Date(a.startTime).getTime() > lastDay.getTime()
      )
    );
  }, []);

  console.log(nextWeekActivities);

  return (
    <div className="container p-3">
      <h1 className="mb-5">Schedule</h1>
      <div className="row">
        <div className="col-lg-6 col-md-8">
          <ol className="list-unstyled">
            <h2 className="fs-6">Today</h2>
            <hr />
            {todaysActivities.map((activity) => (
              <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                <header>{activity.title}</header>
                <small className="text-muted">
                  {dayjs(activity.startTime).format("D MMM [at] H:mm")} •{" "}
                  {activity.instructor}
                </small>
              </li>
            ))}
            <hr />
          </ol>
          <ol className="list-unstyled">
            <h2 className="fs-6">Tomorrow</h2>
            <hr />
            {tomorrowsActivities.map((activity) => (
              <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                <header>{activity.title}</header>
                <small className="text-muted">
                  {dayjs(activity.startTime).format("D MMM [at] H:mm")} •{" "}
                  {activity.instructor}
                </small>
              </li>
            ))}
            <hr />
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
