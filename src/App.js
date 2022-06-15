import activities from "./resources/schedule.json";
import CurrentWeek from "./components/CurrentWeek";
import { formatDate } from "./helper functions/dateFormat";
import ListedActivities from "./components/ListedActivities";

function App() {
  const today = formatDate(new Date());
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var remDays = 6 - tomorrow.getDay();
  var currentWeekStart = new Date();
  var currentWeekEnd = new Date();
  var nextWeekStart = new Date();
  var nextWeekEnd = new Date();
  currentWeekStart.setDate(tomorrow.getDate() + 1);
  currentWeekEnd.setDate(tomorrow.getDate() + remDays);
  nextWeekStart.setDate(currentWeekEnd.getDate() + 1);
  nextWeekEnd.setDate(nextWeekStart.getDate() + 6);

  var sortedSchedule = {
    past: [],
    today: [],
    tomorrow: [],
    currentWeek: [],
    nextWeek: [],
    future: [],
  };
  var sortSchedule = (activities) => {
    activities.map((activity) => {
      var formatedDate = formatDate(new Date(activity.startTime));
      switch (true) {
        case formatedDate < today:
          sortedSchedule.past.push(activity);
          break;
        case formatedDate === today:
          sortedSchedule.today.push(activity);
          break;
        case formatedDate === formatDate(tomorrow):
          sortedSchedule.tomorrow.push(activity);
          break;
        case formatedDate >= formatDate(currentWeekStart) &&
          formatedDate <= formatDate(currentWeekEnd):
          sortedSchedule.currentWeek.push(activity);
          break;
        case formatedDate >= formatDate(nextWeekStart) &&
          formatedDate <= formatDate(nextWeekEnd):
          sortedSchedule.nextWeek.push(activity);
          break;
        default:
          sortedSchedule.future.push(activity);
          break;
      }
      return false;
    });
   
  };
  sortSchedule(activities);

  return (
    <div className="container p-3">
      <h1 className="mb-5">Schedule</h1>
      <ListedActivities title={"Past"} activities={sortedSchedule.past} />
      <CurrentWeek sortedSchedule={sortedSchedule} />
      <ListedActivities
        title={"Next Week"}
        activities={sortedSchedule.nextWeek}
      />
      <ListedActivities title={"Future"} activities={sortedSchedule.future} />
    </div>
  );
}

export default App;
