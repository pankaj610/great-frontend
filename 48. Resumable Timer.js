/**
 * @param {Function} callback
 * @param {number} delay
 * @param {...any} args
 * @returns {{start: Function, pause: Function, stop: Function}}
 */
export default function createResumableInterval(callback, delay, ...args) {
  let timer; 
  let isStop = false;
  return {
    start() {
      if(timer) return;
      if(isStop) return;
      callback.apply(this, args);

      timer = setInterval(() => {
        callback.apply(this, args);
      }, delay)
    },
    pause() {
      clearInterval(timer);
      timer = null;
    },
    stop() {
      clearInterval(timer);
      timer = null;
      isStop = true;
    }
  }
}
