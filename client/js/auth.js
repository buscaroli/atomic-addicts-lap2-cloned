const btn2 = document.querySelector('#selection-2')
const btn3 = document.querySelector('#selection-3')
const loginBtn = document.querySelector('#auth')
const logoutBtn = document.querySelector('#authLogout')
logoutBtn.addEventListener('click', () => {
  logout()
  displayPage(homepage)
})

function login(token) {
  const user = jwt_decode(token)
  localStorage.setItem('token', token)
  localStorage.setItem('username', user.username)
  localStorage.setItem('userEmail', user.email)

  if (btn2.classList.contains('disabled')) {
    btn2.classList.remove('disabled')
    btn3.classList.remove('disabled')
    loginBtn.classList.add('disabled')
    logoutBtn.classList.remove('disabled')
  }

  populateTrackedHabitsOnModalOnLogin()
}

function logout() {
  btn2.classList.add('disabled')
  btn3.classList.add('disabled')
  loginBtn.classList.remove('disabled')
  logoutBtn.classList.add('disabled')

  localStorage.clear()
}

function currentUser() {
  const username = localStorage.getItem('username')
  return username
}

function retrieveToken() {
  const token = localStorage.getItem('token')
  return token
}
