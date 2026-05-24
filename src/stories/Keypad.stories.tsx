import type { Meta, StoryObj } from '@storybook/react-vite'
import { Keypad } from '../components/Keypad'

const meta = {
  title: 'ChenCalc/Keypad',
  component: Keypad,
  args: { onPress: key => console.info(`Pressed ${key}`) }
} satisfies Meta<typeof Keypad>

export default meta
type Story = StoryObj<typeof meta>

export const TecladoCompleto: Story = {}
