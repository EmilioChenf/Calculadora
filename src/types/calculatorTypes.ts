export type CheninOperator = '+' | '-' | '*' | '/' | '%'

export type CheninStatus = 'READY' | 'TYPING' | 'RESULT' | 'ERROR'

export type CheninKey = CheninOperator | '=' | 'C' | 'AC' | '+/-' | '.' | `${number}`

export type CheninState = {
  cheninDisplay: string
  chencitoValue: number | null
  cheninOperator: CheninOperator | null
  shouldResetDisplay: boolean
  status: CheninStatus
}
