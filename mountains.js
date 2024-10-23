import {
    getCustomProperty,
    incrementCustomProperty,
    setCustomProperty,
  } from "./helper.js"
  
const SPEED = 0.002
const mountainsElems = document.querySelectorAll("[data-mountains]")

export function setupMountains() {
  setCustomProperty(mountainsElems[0], "--left", 50)
  setCustomProperty(mountainsElems[1], "--left", 150)
}

export function updateMountains(delta, speedScale) {
  mountainsElems.forEach(mountains => {
    incrementCustomProperty(mountains, "--left", delta * speedScale * SPEED * -1)

    if (getCustomProperty(mountains, "--left") <= -150) {
      incrementCustomProperty(mountains, "--left", 300)
    }
  })
}