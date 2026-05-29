import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { initialCheninState, pressCheninKey } from '../src/utils/calculatorCore.ts'

const pressMany = (keys, base = initialCheninState) =>
  keys.reduce((state, key) => pressCheninKey(state, key), base)

describe('calculatorChenin functional requirements', () => {
  it('ingresa numeros y concatena a la derecha', () => {
    assert.equal(pressMany(['1', '2', '3']).cheninDisplay, '123')
  })

  it('ignora caracteres despues del limite de 9', () => {
    assert.equal(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']).cheninDisplay, '123456789')
  })

  it('1 + 2 = 3', () => {
    assert.equal(pressMany(['1', '+', '2', '=']).cheninDisplay, '3')
  })

  it('9 - 4 = 5', () => {
    assert.equal(pressMany(['9', '-', '4', '=']).cheninDisplay, '5')
  })

  it('2 * 3 = 6', () => {
    assert.equal(pressMany(['2', '*', '3', '=']).cheninDisplay, '6')
  })

  it('8 / 2 = 4', () => {
    assert.equal(pressMany(['8', '/', '2', '=']).cheninDisplay, '4')
  })

  it('10 % 3 = 1', () => {
    assert.equal(pressMany(['1', '0', '%', '3', '=']).cheninDisplay, '1')
  })

  it('999999999 + 1 muestra ERROR', () => {
    const keys = ['9', '9', '9', '9', '9', '9', '9', '9', '9', '+', '1', '=']

    assert.equal(pressMany(keys).cheninDisplay, 'ERROR')
  })

  it('5 - 8 muestra ERROR', () => {
    assert.equal(pressMany(['5', '-', '8', '=']).cheninDisplay, 'ERROR')
  })

  it('el punto decimal cuenta como caracter', () => {
    assert.equal(pressMany(['1', '.', '2', '3', '4', '5', '6', '7', '8', '9']).cheninDisplay, '1.2345678')
  })

  it('1.5 + 1.5 = 3', () => {
    assert.equal(pressMany(['1', '.', '5', '+', '1', '.', '5', '=']).cheninDisplay, '3')
  })

  it('22 / 7 respeta el limite de 9 caracteres', () => {
    const result = pressMany(['2', '2', '/', '7', '=']).cheninDisplay

    assert.equal(result, '3.1428571')
    assert.equal(result.length, 9)
  })

  it('una operacion despues de otra muestra resultado acumulado', () => {
    assert.equal(pressMany(['1', '+', '2', '*']).cheninDisplay, '3')
  })

  it('despues de una operacion el siguiente numero limpia el display', () => {
    assert.equal(pressMany(['1', '+', '2']).cheninDisplay, '2')
  })

  it('el boton igual muestra el resultado final', () => {
    assert.equal(pressMany(['4', '+', '6', '=']).cheninDisplay, '10')
  })

  it('+/- respeta el limite de caracteres', () => {
    assert.equal(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '+/-']).cheninDisplay, '-12345678')
    assert.equal(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '9', '+/-']).cheninDisplay, '123456789')
  })
})
