import { updateGround, setupGround } from "./ground.js"
import { updateMountains, setupMountains } from "./mountains.js"
import { updateClouds, setupClouds } from "./clouds.js"
import { setupCloudsOne, updateCloudsOne } from "./cloudsOne.js"
import { updateAllarik, setupAllarik, getAllarikRect, setAllarikLose } from "./allarik.js"
import { updateObstacle, setupObstacle, getObstacleRects } from "./obstacle.js"

import { morph } from "./helper.js"

const SPEED_SCALE_INCREASE = 0.00001

const scoreElem = document.querySelector("[data-score]")
const startScreenElem = document.querySelector("[data-start-screen]")
const replayScreenElem = document.querySelector("[data-replay-screen]")
const replayButtonElem  = document.querySelector("[data-replay-screen-button]")
const dataEndgameBackgroundElem = document.querySelector("[data-endgame-background]")
const dataFinalScore = document.querySelector("[data-final-score]")

document.addEventListener("keydown", handleStart)
startScreenElem.addEventListener("click", handleStart)
replayButtonElem.addEventListener("mouseover", () => {
  replayButtonElem.src = "imgs/active.png"
})
replayButtonElem.addEventListener("mouseout", () => {
  replayButtonElem.src = "imgs/normal.png"
})

let lastTime
let speedScale
let score

function update(time) {
  if (lastTime == null) {
    lastTime = time
    window.requestAnimationFrame(update)
    return
  }
  
  const delta = time - lastTime

  updateGround(delta, speedScale)
  updateMountains(delta, speedScale)
  updateClouds(delta, speedScale)
  updateCloudsOne(delta, speedScale)
  updateAllarik(delta, speedScale)
  updateObstacle(delta, speedScale)
  updateSpeedScale(delta)
  updateScore(delta)
  if (checkLose()) return handleLose()

  lastTime = time
  window.requestAnimationFrame(update)
}

function checkLose() {
  const allarikRect = getAllarikRect()
  return getObstacleRects().some(rect => isCollision(rect, allarikRect))
}

function isCollision(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  )
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
  score += delta * 0.01
  scoreElem.textContent = Math.floor(score)

  return Math.floor(score);
}

export function handleStart() {
  lastTime = null
  speedScale = 1
  score = 0
  setupGround()
  setupClouds()
  setupCloudsOne()
  setupMountains()
  setupAllarik()
  setupObstacle()
  document.removeEventListener('keydown', handleStart)
  startScreenElem.classList.add("hide")
  replayScreenElem.classList.add("hide")
  dataEndgameBackgroundElem.classList.add("hide")
  scoreElem.classList.remove("hide")
  window.requestAnimationFrame(update)
}

function handleLose() {
  setAllarikLose()
  setTimeout(() => {
    document.addEventListener("keydown", handleStart) 
    replayButtonElem.addEventListener("click", handleStart)
    replayScreenElem.classList.remove("hide")
    dataEndgameBackgroundElem.classList.remove("hide")
    scoreElem.classList.add("hide")
    dataFinalScore.textContent = `${Math.floor(score)} ${morph(Math.floor(score))}`
  }, 100)
}
