import { useEffect, useState } from 'react';
import activities from './resources/schedule.json';
import dayjs from 'dayjs';

function App() {
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);
  const [nextWeek, setNextWeek] = useState([]);
  const [future, setFuture] = useState([]);

  const todayDate = new Date();
  let tomorrowDate = new Date();
  tomorrowDate.setDate(todayDate.getDate() + 1);
  const thisWeekEnds = new Date();
  thisWeekEnds.setDate(todayDate.getDate() + 2);

  let nextWeekStart = new Date(thisWeekEnds + 3);
  nextWeekStart.setDate(thisWeekEnds.getDate() + 1);
  // console.log(nextWeekStart);

  let nextWeekEnd = new Date(thisWeekEnds + 1);
  nextWeekEnd.setDate(nextWeekStart.getDate() + 6);

  useEffect(() => {
    setToday(
      activities.filter(
        (activity) =>
          dayjs(activity.startTime).format('d MMM') ===
          dayjs(todayDate.toISOString()).format('d MMM')
      )
    );
    setTomorrow(
      activities.filter(
        (activity) =>
          dayjs(activity.startTime).format('d MMM') ===
          dayjs(tomorrowDate.toISOString()).format('d MMM')
      )
    );
    setFuture(
      activities.filter(
        (activity) => new Date(activity.startTime).getTime() > nextWeekEnd
      )
    );
    setNextWeek(
      activities.filter(
        (activity) =>
          new Date(activity.startTime).getTime() > thisWeekEnds.getTime() &&
          new Date(activity.startTime).getTime() < nextWeekEnd.getTime()
      )
    );
  }, []);

  console.log(todayDate.toString());
  // console.log(tomorrowDate);
  // console.log(thisWeekEnds);
  // console.log(nextWeekStart);
  // console.log(nextWeekEnd);

  return (
    <div className='container p-3'>
      <h1 className='mb-5'>Schedule</h1>
      <div className='row'>
        <div className='col-lg-6 col-md-8'>
          <h2 className='fs-6'>Showing all</h2>
          <ul className='list-unstyled'>
            <h5>Today</h5>
            {today &&
              today.map((activity) => {
                return (
                  <li
                    className='hover-light-bg p-2 rounded-2'
                    key={activity.id}
                  >
                    <header>{activity.title}</header>
                    <small className='text-muted'>
                      {dayjs(activity.startTime).format('D MMM [at] H:mm')} •{' '}
                      {activity.instructor}
                    </small>
                  </li>
                );
              })}
          </ul>
          <ul className='list-unstyled'>
            <hr />
            <h5>Tomorrow</h5>
            {tomorrow &&
              tomorrow.map((activity) => {
                return (
                  <li
                    className='hover-light-bg p-2 rounded-2'
                    key={activity.id}
                  >
                    <header>{activity.title}</header>
                    <small className='text-muted'>
                      {dayjs(activity.startTime).format('D MMM [at] H:mm')} •{' '}
                      {activity.instructor}
                    </small>
                  </li>
                );
              })}
          </ul>
          <ul className='list-unstyled'>
            <hr />
            <h5>Next week</h5>
            {nextWeek &&
              nextWeek.map((activity) => {
                return (
                  <li
                    className='hover-light-bg p-2 rounded-2'
                    key={activity.id}
                  >
                    <header>{activity.title}</header>
                    <small className='text-muted'>
                      {dayjs(activity.startTime).format('D MMM [at] H:mm')} •{' '}
                      {activity.instructor}
                    </small>
                  </li>
                );
              })}
          </ul>
          <ul className='list-unstyled'>
            <hr />
            <h5>In future...</h5>
            {future &&
              future.map((activity) => {
                return (
                  <li
                    className='hover-light-bg p-2 rounded-2'
                    key={activity.id}
                  >
                    <header>{activity.title}</header>
                    <small className='text-muted'>
                      {dayjs(activity.startTime).format('D MMM [at] H:mm')} •{' '}
                      {activity.instructor}
                    </small>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
