(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const emailInput = document.querySelector('#form-email-input')
const emailLabel = document.querySelector('.form-email-label')
const passwordInput = document.querySelector('#form-password-input')
const passwordLabel = document.querySelector('.form-password-label')

const nameInput = document.querySelector('#form-name-input-signup')
const nameLabel = document.querySelector('.form-name-label-signup')
const emailInputSignup = document.querySelector('#form-email-input-signup')
const emailLabelSignup = document.querySelector('.form-email-label-signup')
const passwordInputSignup = document.querySelector(
  '#form-password-input-signup'
)
const passwordLabelSignup = document.querySelector(
  '.form-password-label-signup'
)

const regBtn = document.querySelector('#form-reg-btn')
const logBtn = document.querySelector('#form-log-btn')

const modal = document.querySelector('.modal')
const modalLogin = document.querySelector('.modal-login')
const modalSignup = document.querySelector('.modal-signup')

const authBtn = document.querySelector('#auth')
const wrapper = document.querySelector('#wrapper')

const loginSendBtn = document.querySelector('#form-button')
loginSendBtn.addEventListener('click', loginSendData)
const registerSendBtn = document.querySelector('#form-button-signup')
registerSendBtn.addEventListener('click', registerSendData)

toggleLabelShift(emailInput, emailLabel, 'move-up')
toggleLabelShift(passwordInput, passwordLabel, 'move-up')
toggleLabelShift(nameInput, nameLabel, 'move-up')
toggleLabelShift(emailInputSignup, emailLabelSignup, 'move-up')
toggleLabelShift(passwordInputSignup, passwordLabelSignup, 'move-up')

function toggleLabelShift(input, label, classRef) {
  input.addEventListener('input', () => {
    // console.log(emailInput.value);
    if (input.value) {
      label.classList.add(classRef)
    } else {
      label.classList.remove(classRef)
    }
  })
}

regBtn.addEventListener('click', () => {
  modalSignup.classList.add('rotate-signup')
  modalLogin.classList.add('rotate-login')
})

logBtn.addEventListener('click', () => {
  modalSignup.classList.remove('rotate-signup')
  modalLogin.classList.remove('rotate-login')
})

authBtn.addEventListener('click', () => {
  if (modal.classList.contains('disabled')) {
    modal.classList.remove('disabled')
  }
})

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('disabled')
  }
})

// ------------ selection actions ------------------- //

const section1 = document.querySelector('.section1')
const sel1 = document.querySelector('#selection-1')
const sel2 = document.querySelector('#selection-2')
const sel3 = document.querySelector('#selection-3')
const sel4 = document.querySelector('#selection-4')

function displayInitialHomepage() {
  section1.innetHTML =
    '<h3>Welcome to Atomic Addicts!</h3> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta posuere convallis. Aenean luctus velit in urna dictum sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut porttitor eu ligula posuere sollicitudin.</p><p> Donec posuere urna odio, id tempus risus bibendum in. Pellentesque non metus maximus, suscipit nisl vitae, condimentum lorem. Ut pellentesque accumsan turpis at euismod. Integer auctor, nunc id vulputate mollis, libero massa lobortis urna, nec mollis tortor massa ut dolor.</p> <p>Curabitur iaculis suscipit sapien, at suscipit est tempus in. Donec consequat et nisl sed sodales. Duis egestas sapien eget nulla porta pellentesque. Fusce tincidunt tortor elit, et eleifend nisi tincidunt quis. Praesent ipsum sem, ornare eget rutrum et, lobortis vel nisi. Donec tempus viverra libero et condimentum. Donec lobortis scelerisque aliquet. Cras at iaculis diam, quis venenatis nisi.</p>'
}

// FETCHING FUNCTIONS
async function loginSendData() {
  const url = `http://localhost:3000/auth/login`
  const email = emailInput.value
  const password = passwordInput.value
  const token = retrieveToken()

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    })

    const data = await response.json()

    if (data.err) {
      throw new Error(data.err)
    } else {
      console.log('app.js - data received from server after logging in: ', data)
      emailInput.value = ''
      passwordInput.value = ''

      console.log('saving token to localStorage: ', { data })
      login(data.token)
    }
  } catch (err) {
    console.log(err)
  }

  modal.classList.add('disabled')
}

async function registerSendData() {
  const url = `http://localhost:3000/auth/register`

  const username = nameInput.value
  const email = emailInputSignup.value
  const password = passwordInputSignup.value

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()

  if (data.err) {
    console.log('Error registering: add a pop up somewhere: ', data.err)
  } else {
    console.log(
      'app.js - data received from server after registering in: ',
      data
    )
    nameInput.value = ''
    emailInputSignup.value = ''
    passwordInputSignup.value = ''

    console.log('saving token to localStorage: ', { data })
    login(data.token)
  }
  modal.classList.add('disabled')
}

},{}]},{},[1]);
