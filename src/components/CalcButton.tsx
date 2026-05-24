import type { CheninKey } from '../types/calculatorTypes'

type CalcButtonProps = {
  label: CheninKey
  tone?: 'number' | 'operator' | 'control' | 'equals'
  onPress: (key: CheninKey) => void
}

export const CalcButton = ({ label, tone = 'number', onPress }: CalcButtonProps) => (
  <button
    className={`calc-button ${tone}`}
    type="button"
    onClick={() => onPress(label)}
    onKeyDown={event => event.preventDefault()}
  >
    {label}
  </button>
)
