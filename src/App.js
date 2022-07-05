import activities from "./resources/schedule.json";
import CurrentWeek from "./components/CurrentWeek";
import ListedActivities from "./components/ListedActivities";
import { useMemo } from "react";
import dayjs from "dayjs";

function App() {

  const sortedSchedule = useMemo(() => {
    const result = {
      past: [],
      today: [],
      tomorrow: [],
      currentWeek: [],
      nextWeek: [],
      future: [],
    };
    activities.forEach((activity) => {
      var formatedDate = dayjs(activity.startTime);
      switch (true) {
        case formatedDate.isBefore(dayjs(), "day"):
          result.past.push(activity);
          break;
        case formatedDate.isSame(dayjs(), "day"):
          result.today.push(activity);
          break;
        case formatedDate.isSame(dayjs().add(1,'day'), "day"):
          result.tomorrow.push(activity);
          break;
        case formatedDate.isSame(dayjs(), "week"):
          result.currentWeek.push(activity);
          break;
        case formatedDate.isSame(dayjs().endOf("week").add(1, "day"), "week"):
          result.nextWeek.push(activity);
          break;
        default:
          result.future.push(activity);
          break;
      }
    });
    return result;
  }, []);

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
