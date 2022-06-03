const fs = require('fs')
const dayjs = require('dayjs')

// days
const offset = parseInt(process.argv[2])

const activitiesRaw = fs.readFileSync('./src/resources/schedule.json', {encoding: 'utf-8'})
const activities = JSON.parse(activitiesRaw)

for (const activity of activities) {
  activity.startTime = dayjs(activity.startTime).add(offset, 'days').toDate().toISOString()
}

fs.writeFileSync('./src/resources/schedule.json', JSON.stringify(activities, null, 2))

console.log('✅ Done')

