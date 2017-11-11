
export function getRandomIntInclusive(min, max) {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);

  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
}

export function setRandomTimeout(fn) {
  const rtime = getRandomIntInclusive(3, 5) * 1000;
  console.log('WAIT TIME', rtime);

  const timeoutId = setTimeout(fn, rtime);

  return timeoutId;
}

export function timedFn(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, 1000);
  });
}
