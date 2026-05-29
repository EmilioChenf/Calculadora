import { access, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { initialCheninState, pressCheninKey } from '../src/utils/calculatorCore.js'

const requiredFiles = [
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'src/components/CalculatorShell.tsx',
  'src/hooks/useCheninCalculator.ts',
  'public/favicon.svg'
]

for (const file of requiredFiles) await access(file)

const result = ['1', '+', '2', '='].reduce((state, key) => pressCheninKey(state, key), initialCheninState)

if (result.cheninDisplay !== '3') throw new Error('Build verification failed: calculator logic is broken')

await mkdir('dist', { recursive: true })
await writeFile(
  join('dist', 'README.txt'),
  'Verified static Vite project structure and calculator core. Run bun install && bun run build for production assets.\n'
)

console.info('Build verification passed')
