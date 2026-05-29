import type { Meta, StoryObj } from '@storybook/react'
import { Keypad } from '../components/Keypad'

const meta = {
  title: 'ChenCalc/Keypad',
  component: Keypad,
  args: { onPress: (key: string) => console.info(`Pressed ${key}`) }
} satisfies Meta<typeof Keypad>

export default meta
type Story = StoryObj<typeof meta>

export const TecladoCompleto: Story = {}
