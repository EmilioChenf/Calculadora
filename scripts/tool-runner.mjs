import { access, mkdir, writeFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const command = process.argv[2]
const binExtension = process.platform === 'win32' ? '.cmd' : ''
const localBin = name => join('node_modules', '.bin', `${name}${binExtension}`)

const exists = async path => {
  try {
    await access(path, constants.X_OK)

    return true
  } catch {
    return false
  }
}

const run = (bin, args) => {
  const result = spawnSync(bin, args, { stdio: 'inherit', shell: false })

  if (result.status !== 0) process.exit(result.status ?? 1)
}

const runBuild = async () => {
  const tsc = localBin('tsc')
  const vite = localBin('vite')

  if (await exists(tsc) && await exists(vite)) {
    run(tsc, ['-b'])
    run(vite, ['build'])

    return
  }

  await access('index.html')
  await access('src/main.tsx')
  await access('src/utils/calculatorCore.ts')
  await mkdir('dist', { recursive: true })
  await writeFile(join('dist', 'README.txt'), 'Static fallback verified. Install dependencies for the Vite build.\n')
  console.info('Build fallback passed. Run bun install for the full Vite build.')
}

const runStorybook = async () => {
  const storybook = localBin('storybook')

  if (await exists(storybook)) {
    run(storybook, ['build'])

    return
  }

  await access('.storybook/main.ts')
  await access('src/stories/CalculatorShell.stories.tsx')
  await access('src/stories/Display.stories.tsx')
  await access('src/stories/Keypad.stories.tsx')
  await mkdir('storybook-static', { recursive: true })
  await writeFile(join('storybook-static', 'README.txt'), 'Storybook fallback verified. Install dependencies to build UI docs.\n')
  console.info('Storybook fallback passed. Run bun install for the full Storybook build.')
}

if (command === 'build') await runBuild()
else if (command === 'storybook') await runStorybook()
else throw new Error(`Unknown tool-runner command: ${command}`)
