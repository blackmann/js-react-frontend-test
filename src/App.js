import activities from "./resources/schedule.json";
import CurrentWeek from "./components/CurrentWeek";
import ListedActivities from "./components/ListedActivities";
import { useMemo } from "react";
import dayjs from "dayjs";

function App() {
  const today = dayjs().format("MDYYYY");
  var tomorrow = dayjs().add(1,'day');
  var remDays = 6 - tomorrow.day();
  var currentWeekStart = dayjs().add(2,'day');
  var currentWeekEnd = dayjs().add(remDays+1,'day');
  var nextWeekStart = currentWeekEnd.add(1,'day');
  var nextWeekEnd = nextWeekStart.add(6,'day');

  var sortedSchedule = {
    past: [],
    today: [],
    tomorrow: [],
    currentWeek: [],
    nextWeek: [],
    future: [],
  };
  var sortSchedule = (activities) => {
    activities.forEach((activity) => {
      var formatedDate = dayjs(activity.startTime).format("MDYYYY");
      switch (true) {
        case formatedDate < today:
          sortedSchedule.past.push(activity);
          break;
        case formatedDate === today:
          sortedSchedule.today.push(activity);
          break;
        case formatedDate === dayjs(tomorrow).format("MDYYYY"):
          sortedSchedule.tomorrow.push(activity);
          break;
        case formatedDate >= dayjs(currentWeekStart).format("MDYYYY") &&
          formatedDate <= dayjs(currentWeekEnd).format("MDYYYY"):
          sortedSchedule.currentWeek.push(activity);
          break;
        case formatedDate >= dayjs(nextWeekStart).format("MDYYYY") &&
          formatedDate <= dayjs(nextWeekEnd).format("MDYYYY"):
          sortedSchedule.nextWeek.push(activity);
          break;
        default:
          sortedSchedule.future.push(activity);
          break;
      }
      return false;
    });
   
  };
 useMemo(()=>sortSchedule(activities),[activities]);
 console.log();

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
