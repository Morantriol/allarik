import {
  getCustomProperty,
  incrementCustomProperty,
  setCustomProperty,
} from "./helper.js"

const SPEED = 0.05
const groundElems = document.querySelectorAll("[data-ground]")
const groundWidth = groundElems[0].offsetWidth
const windowWidth = window.innerWidth
const groundWidthInVW = groundWidth / windowWidth * 100 - 1;

export function setupGround() {
  setCustomProperty(groundElems[0], "--left", 0)
  setCustomProperty(groundElems[1], "--left", groundWidthInVW)
}

export function updateGround(delta, speedScale) {
  groundElems.forEach(ground => {
    incrementCustomProperty(ground, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(ground, "--left") <= -groundWidthInVW) {
      incrementCustomProperty(ground, "--left", groundWidthInVW * 2)
    }
  })
}
