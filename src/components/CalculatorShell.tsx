import { Display } from './Display'
import { Keypad } from './Keypad'
import { useCheninCalculator } from '../hooks/useCheninCalculator'

export const CalculatorShell = () => {
  const { cheninDisplay, status, pressKey } = useCheninCalculator()

  return (
    <main className="lab-stage">
      <section className="calculator-shell">
        <header className="shell-header">
          <p>ChenCalc Lab</p>
          <span>glass compute</span>
        </header>
        <Display cheninDisplay={cheninDisplay} status={status} />
        <Keypad onPress={pressKey} />
      </section>
    </main>
  )
}
