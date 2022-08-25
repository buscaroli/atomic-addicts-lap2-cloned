/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const { title } = require('process');
// const { hasUncaughtExceptionCaptureCallback } = require('process');
// const { isTypedArray } = require('util/types');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


describe('index.html', () => {
    beforeEach(() => {
        require('../js/utils.js')
        document.documentElement.innerHTML = html.toString();
    })

   //Head Section
    test('it has a head title', () => {
        let header = document.querySelector('header');
        const title = document.querySelector('title');
        expect(title).toBeTruthy()
    })

    test('it is linked to script', () => {
        let script = document.querySelector('script');
        const title = document.querySelector('title');
        expect(script).toBeTruthy()
    })

    describe('head', () => {
        test('it has a title', () => {
          const title = document.querySelector('title')
          expect(title.textContent).toContain('Atomic Addicts')
        })
    })


// Testing modal Section Starts
    describe('body', () => {
    it('modal has a title', () => {
      let heading = document.getElementsByClassName('modal-title')
      expect(heading).toBeTruthy()
    })

    it('Login page is present', () => {
        const login = document.querySelector('.modal-login')
        expect(login.textContent).toContain('Login')
    })


    it('email login box', () => {
        const emailBox = document.querySelector('.form-email-label')
        expect(emailBox.textContent).toContain('email')
    })

    it('email login box', () => {
        const emailBox = document.querySelector('.form-password-label')
        expect(emailBox.textContent).toContain('password')
    })

    it('Register button exists on modal', () => {
        let postButton = document.getElementsByClassName('#form-reg-btn');
        expect(postButton).toBeTruthy();
    })

// Testing Modal Section Ends | Add register code testing

    it('wrapper', () => {
        let wrapper = document.getElementsByClassName('#wrapper');
        expect(wrapper).toBeTruthy();
    })

    it('logo', () => {
        let logoName = document.querySelector('.logo');
        expect(logoName.textContent).toContain('Atomic Addicts')
    })


    it('Signup button is present', () => {
        let submit = document.querySelector('#form-button-signup')
        // let submit = document.getElementById('form-button-signup')
        expect(submit.value).toContain('Signup')
    })

    it('auth', () => {
        let authId = document.querySelector('.fa-solid')
        expect(authId).toBeTruthy();
    })

    it('Home Section is present', () => {
        let mainSection = document.querySelector('#home')
        expect(mainSection.textContent).toContain('HOME')
    })

    it('Metric Section exists', () => {
        let mmetricsSection = document.querySelector('#metrics')
        expect(mmetricsSection.textContent).toContain('METRICS')
    })

    it('Metric Section exists', () => {
        let mmetricsSection = document.querySelector('#metrics')
        expect(mmetricsSection.textContent).toContain('METRICS')
    })
    
    it('Smoking material icon exists', () => {
        let smokingIcon = document.querySelector('.fa-smoking')
        expect(smokingIcon).toBeTruthy();
    })

})

describe('index.html', () => {
    test('it has a submit button', () => {
        let postButton = document.getElementsByClassName('postButton');
                expect(postButton).toBeTruthy();
            })

        })
})

// Testing Functions Start
// describe('index.html', () => {
//     beforeEach(() => {
//         document.documentElement.innerHTML = html.toString();
//     })

//     //Testing AuthBtn
//     it('displays model when top right button is clicked', () => {
//         const authButton = document.querySelector('#selection-1')
//         authBtn.dispatchEvent(new Event('click'))
//     })
// })
