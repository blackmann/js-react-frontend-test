import React, { useEffect, useState } from 'react';
import activities from './resources/schedule.json';
import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

function App() {
  const [today, setToday] = useState([]);
  const [tomorrow, setTomorrow] = useState([]);
  const [restOfWeek, setRestOfWeek] = useState([]);
  const [nextWeek, setNextWeek] = useState([]);
  const [future, setFuture] = useState([]);

  //   set today's date
  let todayDate = dayjs.utc().local().format('YYYY-MM-DD');
  //   set tomorrow's date
  let tomorrowDate = dayjs.utc().local().add(1, 'day').format('YYYY-MM-DD');
  //   set end of this week's date
  let endOfWeekDate = dayjs.utc().endOf('week').format('YYYY-MM-DD');
  //   set start of next week's date
  let startOfNextWeekDate = dayjs
    .utc()
    .startOf('week')
    .add(1, 'week')
    .format('YYYY-MM-DD');
  let endOfNextWeekDate = dayjs
    //   set end of next week's date

    .utc()
    .endOf('week')
    .add(1, 'week')
    .format('YYYY-MM-DD');

  useEffect(() => {
    setToday(
      activities.filter(
        (activity) =>
          dayjs(activity.startTime).format('YYYY-MM-DD') === todayDate
      )
    );
    setTomorrow(
      activities.filter(
        (activity) =>
          dayjs(activity.startTime).format('YYYY-MM-DD') === tomorrowDate
      )
    );
    if (nextWeek) {
      setNextWeek(
        activities.filter(
          (activity) =>
            dayjs(activity.startTime).format('YYYY-MM-DD') >=
              startOfNextWeekDate &&
            dayjs(activity.startTime).format('YYYY-MM-DD') <= endOfNextWeekDate
        )
      );
    }
    setFuture(
      activities.filter(
        (activity) =>
          dayjs(activity.startTime).format('YYYY-MM-DD') > endOfNextWeekDate
      )
    );
    setRestOfWeek(
      activities.filter(
        (activity) =>
          dayjs(activity.startTime).format('YYYY-MM-DD') > tomorrowDate &&
          dayjs(activity.startTime).format('YYYY-MM-DD') < endOfWeekDate
      )
    );
  }, []);

  const first = restOfWeek.filter(
    (activity) =>
      dayjs(activity.startTime).format('YYYY-MM-DD') ===
      dayjs(restOfWeek[0].startTime).format('YYYY-MM-DD')
  );
  const second = restOfWeek.filter(
    (activity) =>
      dayjs(activity.startTime).format('YYYY-MM-DD') ===
      dayjs(restOfWeek[1].startTime).format('YYYY-MM-DD')
  );
  const third = restOfWeek.filter(
    (activity) =>
      dayjs(activity.startTime).format('YYYY-MM-DD') !==
        dayjs(second[0].startTime).format('YYYY-MM-DD') &&
      dayjs(activity.startTime).format('YYYY-MM-DD') !==
        dayjs(first[0].startTime).format('YYYY-MM-DD')
  );
  // console.log(third);
  // console.log(restOfWeek);
  // console.log(second);
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
            <hr />
          </ul>
          <ul className='list-unstyled'>
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
            <hr />
          </ul>

          <ul className='list-unstyled'>
            {first.length > 0 ? (
              <>
                <h5>{dayjs(first[0].startTime).format('ddd[,] MMMM DD')}</h5>
                {first.map((activity) => {
                  return (
                    <div key={activity.id}>
                      <li className='hover-light-bg p-2 rounded-2'>
                        <header>{activity.title}</header>
                        <small className='text-muted'>
                          {dayjs(activity.startTime).format('D MMM [at] H:mm')}{' '}
                          • {activity.instructor}
                        </small>
                      </li>
                    </div>
                  );
                })}
                <hr />
              </>
            ) : (
              ''
            )}

            {second.length > 0 ? (
              <div>
                <h5>{dayjs(second[0].startTime).format('ddd[,] MMMM DD')}</h5>
                {second.map((activity) => {
                  return (
                    <div key={activity.id}>
                      <li className='hover-light-bg p-2 rounded-2'>
                        <header>{activity.title}</header>
                        <small className='text-muted'>
                          {dayjs(activity.startTime).format('D MMM [at] H:mm')}{' '}
                          • {activity.instructor}
                        </small>
                      </li>
                    </div>
                  );
                })}
              </div>
            ) : (
              ''
            )}

            <hr />
            {third.length > 0 ? (
              <div>
                <h5>{dayjs(third[0].startTime).format('ddd[,] MMMM DD')}</h5>
                {third.map((activity) => {
                  return (
                    <div key={activity.id}>
                      <li className='hover-light-bg p-2 rounded-2'>
                        <header>{activity.title}</header>
                        <small className='text-muted'>
                          {dayjs(activity.startTime).format('D MMM [at] H:mm')}{' '}
                          • {activity.instructor}
                        </small>
                      </li>
                    </div>
                  );
                })}
              </div>
            ) : (
              ''
            )}

            <hr />
          </ul>

          <ul className='list-unstyled'>
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
            <hr />
          </ul>
          <ul className='list-unstyled'>
            <h5>In future...</h5>
            {future &&
              future.slice(0, 5).map((activity) => {
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
            <hr />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
