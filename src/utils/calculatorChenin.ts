import type { CheninKey, CheninOperator, CheninState } from '../types/calculatorTypes'
import {
  CHENIN_LIMIT as CORE_LIMIT,
  CHENIN_MAX_CHARS as CORE_MAX_CHARS,
  formatChencitoNumber as coreFormatNumber,
  initialCheninState as coreInitialState,
  pressCheninKey as corePressKey,
  resolveCheninResult as coreResolveResult
} from './calculatorCore.js'

export const CHENIN_MAX_CHARS = CORE_MAX_CHARS
export const CHENIN_LIMIT = CORE_LIMIT

export const initialCheninState = coreInitialState as CheninState

export const formatChencitoNumber = (value: number): string => coreFormatNumber(value)

export const resolveCheninResult = (left: number, right: number, cheninOperator: CheninOperator): string =>
  coreResolveResult(left, right, cheninOperator)

export const pressCheninKey = (state: CheninState, key: CheninKey): CheninState =>
  corePressKey(state, key) as CheninState
