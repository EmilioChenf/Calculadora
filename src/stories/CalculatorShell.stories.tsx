import type { Meta, StoryObj } from '@storybook/react'
import { CalculatorShell } from '../components/CalculatorShell'

const meta = {
  title: 'ChenCalc/Calculator',
  component: CalculatorShell
} satisfies Meta<typeof CalculatorShell>

export default meta
type Story = StoryObj<typeof meta>

export const CalculadoraNormal: Story = {}
