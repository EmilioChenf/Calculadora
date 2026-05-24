import { useCallback, useState } from 'react'
import type { CheninKey } from '../types/calculatorTypes'
import { initialCheninState, pressCheninKey } from '../utils/calculatorChenin'

export const useCheninCalculator = () => {
  const [state, setState] = useState(initialCheninState)
  const pressKey = useCallback((key: CheninKey) => setState(current => pressCheninKey(current, key)), [])

  return { ...state, pressKey }
}
