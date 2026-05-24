import type { Meta, StoryObj } from '@storybook/react-vite'
import { Display } from '../components/Display'

const meta = {
  title: 'ChenCalc/Display',
  component: Display,
  args: { cheninDisplay: '0', status: 'READY' }
} satisfies Meta<typeof Display>

export default meta
type Story = StoryObj<typeof meta>

export const Ready: Story = { args: { cheninDisplay: '0', status: 'READY' } }
export const NumeroLargo: Story = { args: { cheninDisplay: '987654321', status: 'TYPING' } }
export const Error: Story = { args: { cheninDisplay: 'ERROR', status: 'ERROR' } }
