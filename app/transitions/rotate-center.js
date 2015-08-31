import { stop, animate, Promise } from "liquid-fire";

export default function rotateCenter(opts={}) {
  var direction = 1;
  if (opts.direction === 'cw') {
    direction = -1;
  }
  stop(this.oldElement);
  if (this.oldElement) {
    this.oldElement.css('transform-origin', '50% 50%');
  }
  if (this.newElement) {
    this.newElement.css('transform-origin', '50% 50%');
  }
  return Promise.all([
    animate(this.oldElement, { rotateZ: -90*direction + 'deg', opacity: 0}, opts),
    animate(this.newElement, { rotateZ: ['0deg', 90*direction+'deg'], opacity: [(opts.maxOpacity || 1), 0] }, opts),
  ]);
}