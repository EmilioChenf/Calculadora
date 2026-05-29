import { describe, expect, test } from 'bun:test'
import type { CheninKey, CheninState } from '../types/calculatorTypes'
import { initialCheninState, pressCheninKey } from '../utils/calculatorCore'

const pressMany = (keys: CheninKey[], base: CheninState = initialCheninState) =>
  keys.reduce((state, key) => pressCheninKey(state, key), base)

describe('calculatorChenin', () => {
  test('ingresa numeros y concatena a la derecha', () => {
    expect(pressMany(['1', '2', '3']).cheninDisplay).toBe('123')
  })

  test('ignora caracteres despues del limite de 9', () => {
    expect(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']).cheninDisplay).toBe('123456789')
  })

  test('1 + 2 = 3', () => {
    expect(pressMany(['1', '+', '2', '=']).cheninDisplay).toBe('3')
  })

  test('9 - 4 = 5', () => {
    expect(pressMany(['9', '-', '4', '=']).cheninDisplay).toBe('5')
  })

  test('2 * 3 = 6', () => {
    expect(pressMany(['2', '*', '3', '=']).cheninDisplay).toBe('6')
  })

  test('8 / 2 = 4', () => {
    expect(pressMany(['8', '/', '2', '=']).cheninDisplay).toBe('4')
  })

  test('10 % 3 = 1', () => {
    expect(pressMany(['1', '0', '%', '3', '=']).cheninDisplay).toBe('1')
  })

  test('resta con resultado negativo muestra ERROR', () => {
    const result = pressMany(['5', '-', '8', '='])

    expect(result.cheninDisplay).toBe('ERROR')
    expect(result.status).toBe('ERROR')
  })

  test('999999999 + 1 muestra ERROR', () => {
    const keys: CheninKey[] = ['9', '9', '9', '9', '9', '9', '9', '9', '9', '+', '1', '=']

    expect(pressMany(keys).cheninDisplay).toBe('ERROR')
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
    expect(pressMany(['1', '.', '2', '3', '4', '5', '6', '7', '8', '9']).cheninDisplay).toBe('1.2345678')
  })

  test('1.5 + 1.5 = 3', () => {
    expect(pressMany(['1', '.', '5', '+', '1', '.', '5', '=']).cheninDisplay).toBe('3')
  })

  test('22 / 7 respeta el limite de 9 caracteres', () => {
    const result = pressMany(['2', '2', '/', '7', '=']).cheninDisplay

    expect(result).toBe('3.1428571')
    expect(result.length).toBe(9)
  })

  test('operaciones continuas calculan resultado parcial inmediato', () => {
    const afterPartial = pressMany(['1', '+', '2', '*'])
    const final = pressMany(['2', '='], afterPartial)

    expect(afterPartial.cheninDisplay).toBe('3')
    expect(final.cheninDisplay).toBe('6')
  })

  test('el siguiente numero despues de una operacion limpia el display', () => {
    expect(pressMany(['1', '+', '2']).cheninDisplay).toBe('2')
  })

  test('cambio de signo respeta el limite de 9 caracteres', () => {
    expect(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '+/-']).cheninDisplay).toBe('-12345678')
    expect(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '9', '+/-']).cheninDisplay).toBe('123456789')
  })
})
