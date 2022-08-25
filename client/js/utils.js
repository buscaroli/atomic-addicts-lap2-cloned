const homepage = document.querySelector('#home')
const metricspage = document.querySelector('#metrics')
const habitspage = document.querySelector('#habits')

const pageDict = {
  'selection-1': homepage,
  'selection-2': metricspage,
  'selection-3': habitspage,
}

window.onload = () => {
  const buttons = document.querySelectorAll('.sel-btn')
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      renderSelectedPage(e)
    })
  })
}

// Main Page ////////////////////////////////

function renderSelectedPage(e) {
  const btnClicked = e.currentTarget.parentElement.id
  // console.log(
  //   '[before switch case, parent] you clicked: ',
  //   e.currentTarget.parentElement.id
  // )
  // e.currentTarget.parentElement bypasses the 'i' to 'a' and then goes to the div with an id of 'selection-n'
  switch (btnClicked) {
    case 'selection-1':
      // console.log('btnClicked: ', btnClicked)
      // console.log('clicked the home button', pageDict[btnClicked])
      displayPage(pageDict[btnClicked])
      break
    case 'selection-2':
      // console.log('clicked the metrics button')
      displayPage(pageDict[btnClicked])
      break
    case 'selection-3':
      // console.log('clicked the habits button')
      displayPage(pageDict[btnClicked])
      break
    case 'selection-4':
      // console.log('clicked the other button')
      // displayPage(pageDict[btnClicked])
      break
  }
}
// every page apart from the homepage should start with a class of 'disabled'
function displayPage(requestedPage) {
  // console.log('requested page ***** ', requestedPage)

  const availablePages = [homepage, metricspage, habitspage]

  populatePage(requestedPage)

  availablePages.forEach((page) => {
    if (page.id === requestedPage.id) {
      // console.log(`page is`, page)
      // console.log(` and requestedpage is`, requestedPage)
      page.classList.remove('disabled')
      // console.log(` (after) and requestedpage is`, requestedPage)
    } else {
      page.classList.add('disabled')
      // console.log(` other page 1 :`, homepage)
      // console.log(` other page 2 :`, metricspage)
      // console.log(` other page 3 :`, habitspage)
    }
  })
}

function populatePage(requestedPage) {
  // const availablePages = [homepage, metricspage, habitspage]
  console.log('populatePage - requestedPage -> ', requestedPage.id)
  switch (requestedPage.id) {
    case 'home':
      console.log('Populating the Homepage')
      break
    case 'metrics':
      console.log('Populating the Metricspage')
      createMetricsWrapper()
      break
    case 'habits':
      console.log('Populating the Habitspage')
      createHabitsWrapper()
      break
    default:
      console.log('Not sure what page I should populate')
  }
}
