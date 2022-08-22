import { useEffect, useState }  from "react";
import { Title }                from "./components/ui/Title";
import { TimerState }           from "./types";
import { Display }              from "./components/app/Display";
import { StartStopResetButton } from "./components/app/StartStopResetButton";

function useTimer() {
  const [savedTime, setSavedTime] = useState<number>(Date.now())
  const [diff, setDiff] = useState<number>(0)

  const [nextState, setNextState] = useState<TimerState>(TimerState.START)
  const [inter, setInter] = useState<number>()

  function start() {
    setSavedTime(Date.now())
    const _inter = window.setInterval(() => {
      setDiff(() => Date.now() - savedTime)
    }, 10)

    setInter(_inter)
  }

  function stop() {
    window.clearInterval(inter)
    setInter(() => undefined)
  }

  function reset() {
    setDiff(0)
    setSavedTime(() => Date.now())
  }

  useEffect(() => {
    return () => {
      if (inter) {
        window.clearInterval(inter)
      }
    }
  }, [])

  function moveToNextState() {
    switch (nextState) {
      case TimerState.START:
        start();
        setNextState(TimerState.STOP)
        break
      case TimerState.STOP:
        stop()
        setNextState(TimerState.RESET)
        break
      case TimerState.RESET:
        reset()
        setNextState(TimerState.START)
        break
    }
  }

  return {
    moveToNextState, diff, nextState
  }
}

interface TimerProps {
  count: number
  onPress: () => void
  state: TimerState
  className?: string
}

function Timer({count, onPress, state}: TimerProps) {
  return <div>
    <Display count={count}/>
    <StartStopResetButton onPress={onPress} state={state}/>
  </div>
}

export default function App() {
  const {moveToNextState, diff, nextState} = useTimer()

  return (<div>
    <Title>Stopwatch</Title>
    <Timer count={diff} onPress={moveToNextState} state={nextState}/>
  </div>)
}
