function createMetricsWrapper() {
  // wipe the habits page
  metricspage.innerHTML = ''

  // HARDCODED USER
  // const user = 'igormirowski'

  createHabitsSelectionBar(metricspage)
  createCalendar(metricspage)

  // will pass it the metrics when available as a second argument
}

async function createCalendar(targetElement, endpoint = 'all') {
  const url = `${baseUrl}entries/calendar/${endpoint}`
  const token = retrieveToken()

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
    const data = await response.json()
    console.log('28 days data ', data)

    const daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const { numberOfDays, dayOfLastMonth, dayOfWeekLastMonthNumber } =
      getNumberOfDaysLastMonth()
    // console.log(numberOfDays)
    // console.log(dayOfLastMonth)
    const now = new Date()
    const today = now.getDate()
    const daysToSkip = now.getDay() + 1
    const thisMonth = getMonthString()

    const calendarWrapper = document.createElement('div')
    calendarWrapper.classList.add('calendar-wrapper')

    const calendarMonth = document.createElement('div')
    calendarMonth.classList.add('calendar-month')
    calendarMonth.textContent = thisMonth
    calendarWrapper.append(calendarMonth)

    const calendarDaysWrapper = document.createElement('div')
    calendarDaysWrapper.classList.add('calendar-days-wrapper')
    daysOfTheWeek.forEach((nameOfDay) => {
      const day = document.createElement('div')
      day.classList.add('calendar-day-name', 'calendar-day')
      day.textContent = nameOfDay
      calendarDaysWrapper.append(day)
    })

    let j = dayOfLastMonth
    let colourIndex = 0
    // console.log('dayOfLastMonth ', dayOfLastMonth)
    for (let i = 1; i <= 35; i++) {
      // console.log('j ', j)
      const day = document.createElement('div')
      day.classList.add('calendar-day-number', 'calendar-day')
      if (i > daysToSkip) {
        if (data[colourIndex] === 1) {
          day.style.backgroundColor = '#e56b6f'
          day.style.color = 'white'
          day.style.border = 'none'
        }
        if (data[colourIndex] === 2) {
          day.style.backgroundColor = '#57cc99'
          day.style.color = 'white'
          day.style.border = 'none'
        }
        colourIndex++
      }

      // console.log('aaaaaa ', dayOfWeekLastMonthNumber)
      if (j > numberOfDays) j = 1

      if (i > dayOfWeekLastMonthNumber + 1 && i <= dayOfLastMonth + 28) {
        // console.log('****', 28 + dayOfWeekLastMonthNumber)
        if (j === today) {
          day.style.fontWeight = 'bold'
          day.style.color = 'black'
          day.style.fontSize = '20px'
        }
        day.textContent = j++
      }
      calendarDaysWrapper.append(day)
    }

    calendarWrapper.append(calendarDaysWrapper)
    targetElement.append(calendarWrapper)
  } catch (err) {
    console.log('metrics.js - createCalendar ', err)
  }
}

function getNumberOfDaysLastMonth() {
  const now = new Date()
  const month = now.getMonth()
  // console.log(month)

  const year = now.getFullYear()
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0

  let numberOfDays
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      numberOfDays = 31
      break
    case 4:
    case 6:
    case 9:
    case 11:
      numberOfDays = 30
      break
    case 2:
      if (isLeapYear) {
        numberOfDays = 29
      } else {
        numberOfDays = 28
      }
    default:
      console.log('Something went wrong getting the days of the month...')
  }

  const { dayOfLastMonth, dayOfWeekLastMonthNumber } = getLastMonthDay()

  return {
    numberOfDays,
    dayOfLastMonth,
    dayOfWeekLastMonthNumber,
  }
}

function getLastMonthDay(date = new Date()) {
  const lastMonth = new Date(date.getTime())
  lastMonth.setDate(date.getDate() - 28)
  const dayOfLastMonth = lastMonth.getDate() + 1
  const dayOfWeekLastMonthNumber = lastMonth.getDay()
  return { dayOfLastMonth, dayOfWeekLastMonthNumber }
}

function getMonthString() {
  const now = new Date()
  const month = now.getMonth() + 1

  switch (month) {
    case 1:
      return 'January'
      break
    case 2:
      return 'February'
      break
    case 3:
      return 'March'
      break
    case 4:
      return 'April'
      break
    case 5:
      return 'May'
      break
    case 6:
      return 'June'
      break
    case 7:
      return 'July'
      break
    case 8:
      return 'August'
      break
    case 9:
      return 'September'
      break
    case 10:
      return 'October'
      break
    case 11:
      return 'November'
      break
    case 12:
      return 'December'
      break
    default:
      console.log('Something went wrong getting the month...')
  }
}

// Create the bar at the top of the calendar that allows the user to
// select which habits to show
// async function createHabitsSelectionBar(targetElement, user) {
//   // chartWrapper will have the chart with the habit's data
//   const chartWrapper = document.createElement('div')
//   chartWrapper.classList.add('metricsChartWrapper')

//   const iconsDict = {
//     exerciseSelBtn: 'fa-football',
//     sleepSelBtn: 'fa-bed',
//     moneySelBtn: 'fa-coins',
//     smokingSelBtn: 'fa-smoking',
//     waterSelBtn: 'fa-faucet-drip',
//   }

//   // selectionBarWrapper will have the buttons to select which
//   // habit to show
//   const selectionBarWrapper = document.createElement('div')
//   selectionBarWrapper.classList.add('selectionBarWrapper')

//   const trackingData = await getTrackingData(user)
//   console.log('trackingData -> ', trackingData)

//   for (let habit in trackingData) {
//     if (
//       trackingData[habit] &&
//       habit.includes('_track') &&
//       trackingData[habit] === true
//     ) {
//       console.log('*=*=* ', habit.includes('_track'))

//       const btnClassName = habit.split('_track')[0].concat('SelBtn')
//       const newBtn = document.createElement('div')
//       newBtn.classList.add(btnClassName, 'metricsSelBtn')
//       newBtn.innerHTML = `<i class="fa-solid ${iconsDict[btnClassName]}"></i>`

//       newBtn.addEventListener('click', () => {
//         // 1. fetch data for this specific habit
//         console.log('Will populate the chart here')
//         // 2. populate the chart
//         chartWrapper.innerHTML = ''

//         const chartElement = document.createElement('div')
//         chartElement.classList.add('chartElement')
//         chartWrapper.append(chartElement)

//         console.log('AAA', this)
//       })

//       selectionBarWrapper.append(newBtn)
//       console.log(btnClassName)
//     }
//   }

//   targetElement.append(selectionBarWrapper)
//   targetElement.append(chartWrapper)
// }

async function createHabitsSelectionBar(targetElement) {
  // chartWrapper will have the chart with the habit's data
  const chartWrapper = document.createElement('div')
  chartWrapper.classList.add('metricsChartWrapper')

  const streakWrapper = document.createElement('div')
  streakWrapper.classList.add('streakWrapper')
  chartWrapper.append(streakWrapper)

  const streakWrapperTitle = document.createElement('div')
  streakWrapperTitle.classList.add('streakWrapperTitle')
  streakWrapperTitle.textContent = 'Streak'
  streakWrapper.append(streakWrapperTitle)

  const streakWrapperValue = document.createElement('div')
  streakWrapperValue.classList.add('streakWrapperValue')
  streakWrapper.append(streakWrapperValue)

  const chartFrame = document.createElement('div')
  chartFrame.classList.add('chartFrame', 'ct-chart')
  chartWrapper.append(chartFrame)

  // selectionBarWrapper will have the buttons to select which
  // habit to show
  const selectionBarWrapper = document.createElement('div')
  selectionBarWrapper.classList.add('selectionBarWrapper')

  const metricsAllBtn = document.createElement('div')
  metricsAllBtn.classList.add('metricsBtn', 'metricsAllBtn')
  metricsAllBtn.innerHTML = `<i class="fa-solid fa-globe"></i>`
  metricsAllBtn.addEventListener('click', () => {
    metricsUpdateStreak(streakWrapperValue, 'all')
    metricsUpdateChart('.chartFrame', 'all')
  })

  const metricsSleepBtn = document.createElement('div')
  metricsSleepBtn.classList.add('metricsBtn', 'metricsSleepBtn')
  metricsSleepBtn.innerHTML = `<i class="fa-solid fa-bed"></i>`
  metricsSleepBtn.addEventListener('click', () => {
    metricsUpdateStreak(streakWrapperValue, 'sleep')
    metricsUpdateChart('.chartFrame', 'sleep')
  })

  const metricsExerciseBtn = document.createElement('div')
  metricsExerciseBtn.classList.add('metricsBtn', 'metricsExerciseBtn')
  metricsExerciseBtn.innerHTML = `<i class="fa-solid fa-football"></i>`
  metricsExerciseBtn.addEventListener('click', () => {
    metricsUpdateStreak(streakWrapperValue, 'exercise')
    metricsUpdateChart('.chartFrame', 'exercise')
  })

  const metricsWaterBtn = document.createElement('div')
  metricsWaterBtn.classList.add('metricsBtn', 'metricsWaterBtn')
  metricsWaterBtn.innerHTML = `<i class="fa-solid fa-faucet-drip"></i>`
  metricsWaterBtn.addEventListener('click', () => {
    metricsUpdateStreak(streakWrapperValue, 'water')
    metricsUpdateChart('.chartFrame', 'water')
  })

  const metricsSmokingBtn = document.createElement('div')
  metricsSmokingBtn.classList.add('metricsBtn', 'metricsSmokingBtn')
  metricsSmokingBtn.innerHTML = `<i class="fa-solid fa-smoking"></i>`
  metricsSmokingBtn.addEventListener('click', () => {
    metricsUpdateStreak(streakWrapperValue, 'smoking')
    metricsUpdateChart('.chartFrame', 'smoking')
  })

  const metricsMoneyBtn = document.createElement('div')
  metricsMoneyBtn.classList.add('metricsBtn', 'metricsMoneyBtn')
  metricsMoneyBtn.innerHTML = `<i class="fa-solid fa-coins"></i>`
  metricsMoneyBtn.addEventListener('click', () => {
    metricsUpdateStreak(streakWrapperValue, 'money')
    metricsUpdateChart('.chartFrame', 'money')
  })

  const trackingData = await getTrackingData()
  console.log('trackingData -> ', trackingData)

  const habitsTrackedByUser = []
  for (let habit in trackingData) {
    if (
      trackingData[habit] &&
      habit.includes('_track') &&
      trackingData[habit] === true
    ) {
      habitsTrackedByUser.push(habit)
    }
  }

  // Append global button and other tracked buttons to the wrapper
  selectionBarWrapper.append(metricsAllBtn)

  if (habitsTrackedByUser.includes('sleep_track'))
    selectionBarWrapper.append(metricsSleepBtn)
  if (habitsTrackedByUser.includes('exercise_track'))
    selectionBarWrapper.append(metricsExerciseBtn)
  if (habitsTrackedByUser.includes('water_track'))
    selectionBarWrapper.append(metricsWaterBtn)
  if (habitsTrackedByUser.includes('smoking_track'))
    selectionBarWrapper.append(metricsSmokingBtn)
  if (habitsTrackedByUser.includes('money_track'))
    selectionBarWrapper.append(metricsMoneyBtn)

  console.log('====================== habitsTrackedByUser', habitsTrackedByUser)

  targetElement.append(selectionBarWrapper)
  targetElement.append(chartWrapper)
  metricsUpdateStreak(streakWrapperValue, 'all')
  metricsUpdateChart('.chartFrame', 'all')
}

// Fetching Functions

async function metricsUpdateStreak(targetElement, endpoint) {
  const url = `${baseUrl}entries/streak/${endpoint}`
  const token = retrieveToken()

  const response = await fetch(url, {
    headers: {
      Authorization: token,
    },
  })
  const data = await response.json()

  console.log('data', data)
  targetElement.textContent = data
}

async function metricsUpdateChart(targetElement, endpoint) {
  let canvasChart = document.querySelector(targetElement)

  const url = `${baseUrl}entries/seven/${endpoint}`
  console.log('*** entries/seven/habit -> endpoint ', endpoint)
  const token = retrieveToken()

  // routes not working
  // const response = await fetch(url)
  // const data = await response.json()

  // console.log('data for the chart', data)

  // fetch data
  const response = await fetch(url, {
    headers: {
      Authorization: token,
    },
  })
  const data = await response.json()
  console.log('****===*** ', data)
  console.log('===***=== ', url)

  const hardcodedArrayWater = [4, 6, 5, 2, 7, 4, 6]
  const hardcodedArraySmoking = [12, 5, 3, 7, 4, 16, 7]
  const hardcodedArrayExercise = [0, 1, 0, 1, 0, 1, 1]
  const hardcodedArrayMoney = [20, 10, 15, 10, 5, 0, 10]
  const hardcodedArrayGlobal = [1, 1, 2, 3, 3, 2, 3]

  populateChart(data, canvasChart)
}

// Chart related functions and data

function populateChart(chartData, targetElemCtx) {
  const labels = ['Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7']

  const data = {
    labels,
    series: [chartData],
  }

  new Chartist.Bar(targetElemCtx, data)
}
