export function morph(int, array) {
    return (array = array || ['очко', 'очка', 'очков']) && array[(int % 100 > 4 && int % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(int % 10 < 5) ? int % 10 : 5]];
}

export function getCustomProperty(elem, prop) {
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0
  }
  
  export function setCustomProperty(elem, prop, value) {
    elem.style.setProperty(prop, value)
  }
  
  export function incrementCustomProperty(elem, prop, inc) {
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc)
  }
  
