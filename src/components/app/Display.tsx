import { formatUnit, msToTimeObject } from "../../shared/time";

export function Display({count}: { count: number }) {
  let {hundreds, seconds, minutes} = msToTimeObject(count);

  return <output className="timer">
    {formatUnit(minutes)}:{formatUnit(seconds)}:{formatUnit(hundreds)}</output>
}
