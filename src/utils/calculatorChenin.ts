import type { CheninKey, CheninOperator, CheninState } from '../types/calculatorTypes'
import {
  CHENIN_LIMIT,
  CHENIN_MAX_CHARS,
  formatChencitoNumber,
  initialCheninState,
  pressCheninKey,
  resolveCheninResult
} from './calculatorCore'

export type { CheninKey, CheninOperator, CheninState }
export {
  CHENIN_LIMIT,
  CHENIN_MAX_CHARS,
  formatChencitoNumber,
  initialCheninState,
  pressCheninKey,
  resolveCheninResult
}
