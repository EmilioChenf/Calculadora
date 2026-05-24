import type { CheninStatus } from '../types/calculatorTypes'

type DisplayProps = {
  cheninDisplay: string
  status: CheninStatus
}

export const Display = ({ cheninDisplay, status }: DisplayProps) => (
  <section className="display-panel" aria-live="polite">
    <div className={`status-pill ${status.toLowerCase()}`}>{status}</div>
    <output className="display-value">{cheninDisplay}</output>
  </section>
)
