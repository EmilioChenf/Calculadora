import { describe, expect, test } from 'bun:test'
import type { CheninKey, CheninState } from '../types/calculatorTypes'
import { initialCheninState, pressCheninKey } from '../utils/calculatorChenin'

const pressMany = (keys: CheninKey[], base: CheninState = initialCheninState) =>
  keys.reduce((state, key) => pressCheninKey(state, key), base)

describe('calculatorChenin', () => {
  test('ingresa numeros y concatena a la derecha', () => {
    expect(pressMany(['1', '2', '3']).cheninDisplay).toBe('123')
  })

  test('ignora caracteres despues del limite de 9', () => {
    expect(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']).cheninDisplay).toBe('123456789')
  })

  test('resuelve suma simple', () => {
    expect(pressMany(['5', '+', '3', '=']).cheninDisplay).toBe('8')
  })

  test('resta con resultado negativo muestra ERROR', () => {
    const result = pressMany(['3', '-', '5', '='])

    expect(result.cheninDisplay).toBe('ERROR')
    expect(result.status).toBe('ERROR')
  })

  test('multiplicacion mayor a 999999999 muestra ERROR', () => {
    expect(pressMany(['9', '9', '9', '9', '9', '9', '9', '9', '9', '*', '2', '=']).cheninDisplay).toBe('ERROR')
  })

  test('division normal se ajusta al display', () => {
    expect(pressMany(['7', '/', '2', '=']).cheninDisplay).toBe('3.5')
  })

  test('division entre cero muestra ERROR', () => {
    expect(pressMany(['8', '/', '0', '=']).cheninDisplay).toBe('ERROR')
  })

  test('modulo calcula residuo', () => {
    expect(pressMany(['9', '%', '4', '=']).cheninDisplay).toBe('1')
  })

  test('punto decimal cuenta dentro del limite', () => {
    expect(pressMany(['1', '.', '2', '3', '+', '1', '=']).cheninDisplay).toBe('2.23')
  })

  test('operaciones continuas calculan resultado parcial inmediato', () => {
    const afterPartial = pressMany(['5', '+', '3', '*'])
    const final = pressMany(['2', '='], afterPartial)

    expect(afterPartial.cheninDisplay).toBe('8')
    expect(final.cheninDisplay).toBe('16')
  })

  test('cambio de signo respeta el limite de 9 caracteres', () => {
    expect(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '9', '+/-']).cheninDisplay).toBe('123456789')
  })
})
