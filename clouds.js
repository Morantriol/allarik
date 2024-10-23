import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
  } from "./helper.js"
  
const SPEED = 0.005
const cloudsElems = document.querySelectorAll("[data-clouds-0]")

export function setupClouds() {
  setCustomProperty(cloudsElems[0], "--left", 6)
  setCustomProperty(cloudsElems[1], "--left", 100)
}

export function updateClouds(delta, speedScale) {
  cloudsElems.forEach(clouds => {
    incrementCustomProperty(clouds, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(clouds, "--left") <= -100) {
      incrementCustomProperty(clouds, "--left", 200)
    }
  })
}
