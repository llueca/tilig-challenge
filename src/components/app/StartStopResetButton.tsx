import { TimerState } from "../../types";

const states: { [key: string]: { label: string; classes: string } } = {
  [TimerState.START]: {label: 'Start', classes: 'button button--start'},
  [TimerState.STOP]: {label: 'Stop', classes: 'button button--stop'},
  [TimerState.RESET]: {label: 'Reset', classes: 'button button--reset'}
}

export function StartStopResetButton({onPress, state}: { onPress: () => void, state: TimerState }) {
  const {label, classes} = states[state]
  return <button onClick={onPress} className={classes}>{label}</button>
}
