import { CalcButton } from './CalcButton'
import type { CheninKey } from '../types/calculatorTypes'

const keys: CheninKey[] = [
  'AC', '+/-', '%', '/', '7', '8', '9', '*', '4',
  '5', '6', '-', '1', '2', '3', '+', '0', '.', '='
]

const toneFor = (key: CheninKey) => {
  if (key === '=') return 'equals'
  if (['AC', '+/-'].includes(key)) return 'control'
  if (['+', '-', '*', '/', '%'].includes(key)) return 'operator'
  return 'number'
}

export const Keypad = ({ onPress }: { onPress: (key: CheninKey) => void }) => (
  <div className="keypad" aria-label="Teclado de calculadora">
    {keys.map(key => <CalcButton key={key} label={key} tone={toneFor(key)} onPress={onPress} />)}
  </div>
)
