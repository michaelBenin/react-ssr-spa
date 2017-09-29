global.requestAnimationFrame = function raf(callback) {
  setTimeout(callback, 0);
};
