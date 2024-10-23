import {
  incrementCustomProperty,
  setCustomProperty,
  getCustomProperty,
} from "./helper.js"

const allarikElem = document.querySelector("[data-allarik]")
const JUMP_SPEED = 0.4
const GRAVITY = 0.0015
const ALLARIK_FRAME_COUNT = 4
const FRAME_TIME = 100

let isJumping
let allarikFrame
let currentFrameTime
let yVelocity
export function setupAllarik() {
  isJumping = false
  allarikFrame = 0
  currentFrameTime = 0
  yVelocity = 0
  setCustomProperty(allarikElem, "--bottom", 7)
  document.removeEventListener("keydown", onJump)
  document.addEventListener("keydown", onJump)
}

export function updateAllarik(delta, speedScale) {
  handleRun(delta, speedScale)
  handleJump(delta)
}

export function getAllarikRect() {
  return allarikElem.getBoundingClientRect()
}

export function setAllarikLose() {
  allarikElem.src = "imgs/allarik-lose.png"
  setCustomProperty(allarikElem, "--bottom", 7 )
}

function handleRun(delta, speedScale) {
  if (isJumping) {
    allarikElem.src = `imgs/allarik-jump.png`
    return
  }

  if (currentFrameTime >= FRAME_TIME) {
    allarikFrame = (allarikFrame + 1) % ALLARIK_FRAME_COUNT
    allarikElem.src = `imgs/allarik-run-${allarikFrame}.png`
    currentFrameTime -= FRAME_TIME
  }
  currentFrameTime += delta * speedScale
}

function handleJump(delta) {
  if (!isJumping) return

  incrementCustomProperty(allarikElem, "--bottom", yVelocity * delta)

  if (getCustomProperty(allarikElem, "--bottom") <= 7) {
    setCustomProperty(allarikElem, "--bottom", 7)
    isJumping = false 
  }

  yVelocity -= GRAVITY * delta
}

function onJump(e) {
  if (e.code !== "Space" || isJumping) return

  yVelocity = JUMP_SPEED
  isJumping = true
}
