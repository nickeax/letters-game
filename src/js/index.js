const output = document.querySelector('#output')
const controls = document.querySelector('#controls')
const timeLimit = document.querySelector('#timeLimit')
const incDec = document.querySelector('#incDec')
const smallsLargeReadout = document.querySelector('#smallsLargeReadout')
const smallNumbers = document.querySelector('#smallNumbers')
const largeNumbers = document.querySelector('#largeNumbers')
const btnPlay = document.querySelector('#btnPlay')
const spinnerUp = document.querySelector('#spinnerUp')
const spinnerDown = document.querySelector('#spinnerDown')

const minGoal = 50
const maxSmalls = 6
let seconds = 30
let smalls = maxSmalls / 2
let large = maxSmalls / 2
let countingDown = false

document.addEventListener('click', ev => handleClick(ev))
writeToInfo(`SMALLS ${smalls} / LARGE ${large}`)
btnPlay.textContent = "PLAY"

function handleClick(e) {
  e.preventDefault()
  e.stopPropagation()
  if (countingDown) return
  switch (e.target.id) {
    case 'spinnerUp':
      if (smalls < maxSmalls) {
        smalls++
        large = maxSmalls - smalls
      } else {
        smalls = maxSmalls
      }
      writeToInfo(`SMALLS ${smalls} / LARGE ${large}`)
      break
    case 'spinnerDown':
      if (smalls > 0) {
        smalls--
        large = maxSmalls - smalls
      } else {
        smalls = 0
        large = maxSmalls - smalls
      }
      writeToInfo(`SMALLS ${smalls} / LARGE ${large}`)
      break
    case 'btnPlay':
      countingDown = true
      generateNumbers()
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
            btnPlay.textContent = "Play Again"
            btnPlay.classList.toggle("alert")
            countingDown = false
          }, 3000);
        }
        seconds--
      }, 1000);
      break

    default:
      break;
  }
}

function lockElements() {
  timeLimit.style.opacity = 0
  incDec.style.opacity = 0
  smallsLargeReadout.style.opacity = 0
}

function unlockElements() {
  timeLimit.style.opacity = 1.0
  incDec.style.opacity = 1.0
  smallsLargeReadout.style.opacity = 1.0
}

function writeToOutput(inp) {
  output.innerHTML = inp
}

function writeToInfo(inp) {
  smallsLargeReadout.innerHTML = inp
}

function generateNumbers() {
  let nums = ""
  const largeSet = [25, 50, 75, 100]
  const smallsSet = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  for (let i = 0; i < smalls; i++) {
    nums += `<span class="playNumber">${smallsSet[Math.floor(Math.random() * smallsSet.length)]}</span>`
  }
  // nums += "LARGE: "
  for (let i = 0; i < large; i++) {
    nums += `<span class="playNumber">${largeSet[Math.floor(Math.random() * largeSet.length)]}</span>`
  }
  let goal = Math.floor(Math.random() * 1000)
  if (goal > 999) goal = 999
  nums += `<span class="goal">${goal}</span>`
  writeToOutput(nums)
}
