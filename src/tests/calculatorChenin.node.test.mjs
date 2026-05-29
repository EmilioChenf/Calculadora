import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { initialCheninState, pressCheninKey } from '../utils/calculatorCore.js'

const pressMany = (keys, base = initialCheninState) =>
  keys.reduce((state, key) => pressCheninKey(state, key), base)

describe('calculatorChenin functional requirements', () => {
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

  it('999999999 + 1 displays ERROR', () => {
    const keys = ['9', '9', '9', '9', '9', '9', '9', '9', '9', '+', '1', '=']

    assert.equal(pressMany(keys).cheninDisplay, 'ERROR')
  })

  it('5 - 8 displays ERROR', () => {
    assert.equal(pressMany(['5', '-', '8', '=']).cheninDisplay, 'ERROR')
  })

  it('ignores input after the ninth display character', () => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

    assert.equal(pressMany(keys).cheninDisplay, '123456789')
  })

  it('decimal point counts as one of the nine display characters', () => {
    const keys = ['1', '.', '2', '3', '4', '5', '6', '7', '8', '9']

    assert.equal(pressMany(keys).cheninDisplay, '1.2345678')
  })

  it('1.5 + 1.5 = 3', () => {
    const keys = ['1', '.', '5', '+', '1', '.', '5', '=']

    assert.equal(pressMany(keys).cheninDisplay, '3')
  })

  it('22 / 7 stays within the nine character display limit', () => {
    const result = pressMany(['2', '2', '/', '7', '=']).cheninDisplay

    assert.equal(result, '3.1428571')
    assert.equal(result.length, 9)
  })

  it('pressing another operation shows the accumulated result', () => {
    const afterPartial = pressMany(['1', '+', '2', '*'])

    assert.equal(afterPartial.cheninDisplay, '3')
  })

  it('the next number after an operation clears the display before entering', () => {
    assert.equal(pressMany(['1', '+', '2']).cheninDisplay, '2')
  })

  it('equals shows the final result', () => {
    assert.equal(pressMany(['4', '+', '6', '=']).cheninDisplay, '10')
  })

  it('+/- toggles sign and respects the nine character display limit', () => {
    assert.equal(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '+/-']).cheninDisplay, '-12345678')
    assert.equal(pressMany(['1', '2', '3', '4', '5', '6', '7', '8', '9', '+/-']).cheninDisplay, '123456789')
  })
})
