const renderDOM = require('./helpers')

let dom
let document

describe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('index.html')
    document = await dom.window.document
  })

  //Testing AuthBtn
  it('habit section appears upon clicking habit icon', () => {
    // const authButton = document.querySelector('#selection-1')
    // const authBtn = document.querySelector('#auth')
    const selectThree = document.querySelector('.fa-smoking')
    selectThree.dispatchEvent(new dom.window.Event('click'))

    const habitsManageBtnAnchor = document.querySelector('.section1')
    expect(habitsManageBtnAnchor).toBeTruthy()
  })

  it('habit section appears upon clicking habit icon', () => {
    const selectThree = document.querySelector('.fa-smoking')
    selectThree.dispatchEvent(new dom.window.Event('click'))

    const habitsTopCtner = document.querySelector('.habitsWaterCard')
    expect(habitsTopCtner).toBeTruthy()
  })

  it('habit section appears upon clicking habit icon', () => {
    const sevenDaysResultm = [3, 4, 3, 6, 7, 8, 6]
  })
})
