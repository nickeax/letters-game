const output = document.querySelector('#output')
const controls = document.querySelector('#controls')
const timeLimit = document.querySelector('#timeLimit')
const incDec = document.querySelector('#incDec')
const letterList = document.querySelector('#letterList')
const smallNumbers = document.querySelector('#smallNumbers')
const largeNumbers = document.querySelector('#largeNumbers')
const btnPlay = document.querySelector('#btnPlay')
const addConsonant = document.querySelector('#addConsonant')
const addVowel = document.querySelector('#addVowel')

const VOWELS = ['a', 'e', 'i', 'o', 'u']
const CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']

let seconds = 30
let countingDown = false
const MAX_GAME_LETTERS = 9
let lettersCount = 0
let gameLetters = ""
btnPlay.style.display = 'none'

document.addEventListener('click', ev => handleClick(ev))
btnPlay.textContent = "PLAY"

function handleClick(e) {
  e.preventDefault()
  e.stopPropagation()

  if (countingDown) return

  switch (e.target.id) {
    case 'addConsonant':
      if (lettersCount >= MAX_GAME_LETTERS) return
      generateConsonant()
      ++lettersCount
      break
    case 'addVowel':
      if (lettersCount >= MAX_GAME_LETTERS) return
      generateVowels()
      ++lettersCount
      break
    case 'btnPlay':
      console.log(`PLAY!`)
      countingDown = true
      lockElements()
      btnPlay.textContent = 'READY?'
      if (parseInt(timeLimit.value) < 30) {
        seconds = 30
      } else {
        seconds = parseInt(timeLimit.value) || 30
      }
      let iid = setInterval(() => {
        btnPlay.textContent = `${seconds}s`
        if (seconds === 0) {
          btnPlay.classList.toggle("alert")
          btnPlay.style.color = 'firebrick'
          unlockElements()
          btnPlay.style.display = 'block'
          btnPlay.textContent = "TIMES UP!"
          clearTimeout(iid)
          setTimeout(() => {
            btnPlay.style.color = 'white'
            btnPlay.textContent = "Play"
            btnPlay.classList.toggle("alert")
            gameLetters = ''
            writeToOutput(gameLetters)
            countingDown = false
            btnPlay.style.display = 'none'
            lettersCount = 0
          }, 3000);
        }
        seconds--
      }, 1000);
      break

    default:
      break;
  }
  if (lettersCount >= MAX_GAME_LETTERS) {
    btnPlay.style.display = 'block'
    lockElements()
    return
  }
}

function writeToOutput(inp) {
  output.innerHTML = inp
}

function writeToInfo(inp) {
  letterList.innerHTML = inp
}

function generateConsonant() {
  gameLetters += `<span class="playLetter">${CONSONANTS[Math.floor(Math.random() * CONSONANTS.length)].toUpperCase()}</span>`
  writeToOutput(gameLetters)
}

function generateVowels() {
  gameLetters += `<span class="playLetter">${VOWELS[Math.floor(Math.random() * VOWELS.length)].toUpperCase()}</span>`
  writeToOutput(gameLetters)
}

function lockElements() {
  timeLimit.style.opacity = 0
  addLetter.style.opacity = 0
  letterList.style.opacity = 0
}

function unlockElements() {
  timeLimit.style.opacity = 1.0
  addLetter.style.opacity = 1.0
  letterList.style.opacity = 1.0
}