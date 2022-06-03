import activities from './resources/schedule.json'
import dayjs from "dayjs";

function App() {
  return (
    <div className="container p-3">
      <h1 className="mb-5">Schedule</h1>
      <div className="row">
        <div className="col-lg-6 col-md-8">
          <h2 className="fs-6">Showing all</h2>

          <ol className="list-unstyled">
            {activities.map((activity) => (
              <li className="hover-light-bg p-2 rounded-2" key={activity.id}>
                <header>{activity.title}</header>
                <small className="text-muted">
                  {dayjs(activity.startTime).format("D MMM [at] H:mm")} • {activity.instructor}
                </small>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
