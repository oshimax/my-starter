import 'ress';
import '../stylesheets/main.scss';

const navcontainer  = document.getElementsByClassName('nav-container')
const menubutton = document.getElementById('menu-button')
const overlay = document.getElementsByClassName('overlay')

menubutton.addEventListener('click', () => {
  menubutton.classList.toggle('open')
  navcontainer[0].classList.toggle('open')
  overlay[0].classList.toggle('visible')
})

overlay[0].addEventListener('click', () => {
  menubutton.classList.toggle('open')
  navcontainer[0].classList.toggle('open')
  overlay[0].classList.toggle('visible')
})
