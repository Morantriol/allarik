import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
  } from "./helper.js"
  
const SPEED = 0.008
const cloudsElems = document.querySelectorAll("[data-clouds-1]")

export function setupCloudsOne() {
  setCustomProperty(cloudsElems[0], "--left", 59)
  setCustomProperty(cloudsElems[1], "--left", 159)
}

export function updateCloudsOne(delta, speedScale) {
  cloudsElems.forEach(clouds => {
    incrementCustomProperty(clouds, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(clouds, "--left") <= -159) {
      incrementCustomProperty(clouds, "--left", 318)
    }
  })
}
