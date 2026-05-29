import { access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'

const binExtension = process.platform === 'win32' ? '.cmd' : ''
const standard = join('node_modules', '.bin', `standard${binExtension}`)

const hasStandard = async () => {
  try {
    await access(standard, constants.X_OK)

    return true
  } catch {
    return false
  }
}

if (await hasStandard()) {
  const result = spawnSync(standard, ['scripts/**/*.mjs'], { stdio: 'inherit', shell: false })

  if (result.status !== 0) process.exit(result.status ?? 1)
} else {
  console.info('Standard dependency declared; local binary unavailable. Running custom checks.')
}

const custom = spawnSync(process.execPath, ['scripts/strict-lint.mjs'], { stdio: 'inherit', shell: false })

if (custom.status !== 0) process.exit(custom.status ?? 1)
