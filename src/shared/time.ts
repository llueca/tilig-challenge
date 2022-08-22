export function formatUnit(num: number) {
  return `0${num}`.slice(-2)
}

export function msToTimeObject(count: number) {
  const _hundreds = Math.floor(count / 10);
  const hundreds = _hundreds % 100;
  let remainder = Math.floor(_hundreds / 100)
  let seconds = remainder % 60;
  let minutes = Math.floor(remainder / 60)
  return {hundreds, seconds, minutes};
}
