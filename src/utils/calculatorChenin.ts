import type { CheninKey, CheninOperator, CheninState } from '../types/calculatorTypes'

export const CHENIN_MAX_CHARS = 9
export const CHENIN_LIMIT = 999999999

export const initialCheninState: CheninState = {
  cheninDisplay: '0',
  chencitoValue: null,
  cheninOperator: null,
  shouldResetDisplay: false,
  status: 'READY'
}

export const formatChencitoNumber = (value: number): string => {
  if (!Number.isFinite(value) || value < 0 || value > CHENIN_LIMIT) return 'ERROR'
  if (Number.isInteger(value)) return String(value).length <= CHENIN_MAX_CHARS ? String(value) : 'ERROR'

  const integerPart = Math.trunc(value).toString()
  const decimals = Math.max(CHENIN_MAX_CHARS - integerPart.length - 1, 0)
  const trimmed = value.toFixed(decimals).replace(/\.?0+$/, '')

  return trimmed.length <= CHENIN_MAX_CHARS && Number(trimmed) <= CHENIN_LIMIT ? trimmed : 'ERROR'
}

export const resolveCheninResult = (left: number, right: number, cheninOperator: CheninOperator): string => {
  if ((cheninOperator === '/' || cheninOperator === '%') && right === 0) return 'ERROR'
  const operations = { '+': left + right, '-': left - right, '*': left * right, '/': left / right, '%': left % right }

  return formatChencitoNumber(operations[cheninOperator])
}

const enterDigit = (state: CheninState, digit: string): CheninState => {
  const fresh = state.shouldResetDisplay || state.cheninDisplay === '0' || state.status === 'ERROR'
  const cheninDisplay = fresh ? digit : `${state.cheninDisplay}${digit}`

  if (cheninDisplay.length > CHENIN_MAX_CHARS) return state

  return { ...state, cheninDisplay, shouldResetDisplay: false, status: 'TYPING' }
}

const enterDecimal = (state: CheninState): CheninState => {
  if (state.status === 'ERROR') return { ...initialCheninState, cheninDisplay: '0.', status: 'TYPING' }
  if (state.shouldResetDisplay) return { ...state, cheninDisplay: '0.', shouldResetDisplay: false, status: 'TYPING' }
  if (state.cheninDisplay.includes('.') || state.cheninDisplay.length >= CHENIN_MAX_CHARS) return state

  return { ...state, cheninDisplay: `${state.cheninDisplay}.`, status: 'TYPING' }
}

const toggleSign = (state: CheninState): CheninState => {
  if (state.status === 'ERROR' || state.cheninDisplay === '0') return state
  const cheninDisplay = state.cheninDisplay.startsWith('-')
    ? state.cheninDisplay.slice(1)
    : `-${state.cheninDisplay}`

  return cheninDisplay.length <= CHENIN_MAX_CHARS ? { ...state, cheninDisplay, status: 'TYPING' } : state
}

const isCheninOperator = (key: CheninKey): key is CheninOperator => ['+', '-', '*', '/', '%'].includes(key)

const commitOperation = (state: CheninState, nextOperator: CheninOperator): CheninState => {
  if (state.status === 'ERROR') return state
  const right = Number(state.cheninDisplay)

  if (state.chencitoValue === null || state.cheninOperator === null) {
    return { ...state, chencitoValue: right, cheninOperator: nextOperator, shouldResetDisplay: true, status: 'RESULT' }
  }

  const cheninDisplay = resolveCheninResult(state.chencitoValue, right, state.cheninOperator)
  if (cheninDisplay === 'ERROR') return { ...initialCheninState, cheninDisplay, status: 'ERROR' }

  return {
    cheninDisplay,
    chencitoValue: Number(cheninDisplay),
    cheninOperator: nextOperator,
    shouldResetDisplay: true,
    status: 'RESULT'
  }
}

const commitEquals = (state: CheninState): CheninState => {
  if (state.status === 'ERROR' || state.chencitoValue === null || state.cheninOperator === null) return state
  const cheninDisplay = resolveCheninResult(state.chencitoValue, Number(state.cheninDisplay), state.cheninOperator)

  return cheninDisplay === 'ERROR'
    ? { ...initialCheninState, cheninDisplay, status: 'ERROR' }
    : { ...initialCheninState, cheninDisplay, shouldResetDisplay: true, status: 'RESULT' }
}

export const pressCheninKey = (state: CheninState, key: CheninKey): CheninState => {
  if (key === 'C' || key === 'AC') return initialCheninState
  if (/^\d$/.test(key)) return enterDigit(state, key)
  if (key === '.') return enterDecimal(state)
  if (key === '+/-') return toggleSign(state)
  if (key === '=') return commitEquals(state)
  if (isCheninOperator(key)) return commitOperation(state, key)

  return state
}
