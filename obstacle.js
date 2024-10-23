import {
  setCustomProperty,
  incrementCustomProperty,
  getCustomProperty,
} from "./helper.js"

const SPEED = 0.05
const OBSTACLE_INTERVAL_MIN = 700
const OBSTACLE_INTERVAL_MAX = 2000
const worldElem = document.querySelector("[data-world]")

let nextObstacleTime
export function setupObstacle() {
  nextObstacleTime = OBSTACLE_INTERVAL_MIN
  document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
    obstacle.remove()
  })
}

export function updateObstacle(delta, speedScale) {
  document.querySelectorAll("[data-obstacle]").forEach(obstacle => {
    incrementCustomProperty(obstacle, "--left", delta * speedScale * SPEED * -1)
    if (getCustomProperty(obstacle, "--left") <= -100) {
      obstacle.remove()
    }
  })

  if (nextObstacleTime <= 0) {
    createObstacle()
    nextObstacleTime =
      randomNumberBetween(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / speedScale
  }
  nextObstacleTime -= delta
}

export function getObstacleRects() {
  return [...document.querySelectorAll("[data-obstacle]")].map(obstacle => {
    return obstacle.getBoundingClientRect()
  })
}

function createObstacle() {
  const obstacle = document.createElement("img")
  const randomObstacle = randomNumberBetween(0, 3);
  obstacle.dataset.obstacle = true
  obstacle.src = `imgs/obstacle-${randomObstacle}.png`
  // obstacle.src = "imgs/fox.png"
  obstacle.classList.add(`obstacle-${randomObstacle}`)
  setCustomProperty(obstacle, "--left", 100)
  worldElem.append(obstacle)
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
