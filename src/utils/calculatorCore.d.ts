import type { CheninKey, CheninOperator, CheninState } from '../types/calculatorTypes'

export const CHENIN_MAX_CHARS: 9
export const CHENIN_LIMIT: 999999999
export const initialCheninState: CheninState
export const formatChencitoNumber: (value: number) => string
export const resolveCheninResult: (left: number, right: number, cheninOperator: CheninOperator) => string
export const pressCheninKey: (state: CheninState, key: CheninKey) => CheninState
