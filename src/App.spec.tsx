import { it, expect, vi }                          from 'vitest'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import App                                         from './App'

describe('<App />', () => {
  describe('<Timer />', () => {
    const TIME_TO_PASS_IN_MS = 12 * (60 * 1000) + 34 * (1000) + 567 * (1)

    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should display the title of the app', () => {
      render(<App />)

      expect(screen.getByText('Stopwatch')).toBeInTheDocument()
    })

    it('should show the elapsed time as 00:00:00 at first', () => {
      render(<App/>)

      expect(screen.getByText('00:00:00')).toBeInTheDocument()
    })

    it('it should show the elapsed time after the user press the button', async () => {
      render(<App/>)

      act(() => {
        fireEvent.click(screen.getByText('Start'))
        vi.advanceTimersByTime(TIME_TO_PASS_IN_MS)
      })

      await waitFor(() => screen.getByText('12:34:56'))
    })

    it('should show stop the count after the user press the button for second time', () => {
      render(<App/>)

      act(() => {
        fireEvent.click(screen.getByText('Start'))
        vi.advanceTimersByTime(TIME_TO_PASS_IN_MS)
      })

      act(() => {
        fireEvent.click(screen.getByText('Stop'))
        vi.advanceTimersByTime(1000)
      })

      expect(screen.getByText('12:34:56'))
    })

    it('should clear the count after the user clicks three times', () => {
      render(<App/>)

      act(() => {
        fireEvent.click(screen.getByText('Start'))
        vi.advanceTimersByTime(TIME_TO_PASS_IN_MS)
      })

      act(() => {
        fireEvent.click(screen.getByText('Stop'))
      })

      act(() => {
        fireEvent.click(screen.getByText('Reset'))
      })

      expect(screen.getByText('00:00:00'))
    })
  })
})
