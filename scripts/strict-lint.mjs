import { readdir, readFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const roots = ['src', '.storybook', 'scripts']
const extensions = new Set(['.js', '.jsx', '.ts', '.tsx'])
const ignored = new Set(['node_modules', 'dist', 'storybook-static', 'coverage'])
const issues = []

const hasLintExtension = fileName => [...extensions].some(extension => fileName.endsWith(extension))

const collectFiles = async directory => {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(directory, entry.name)

    if (entry.isDirectory() && !ignored.has(entry.name)) files.push(...await collectFiles(path))
    if (entry.isFile() && hasLintExtension(entry.name)) files.push(path)
  }

  return files
}

const lineHasForbiddenSemicolon = line => {
  const trimmed = line.trim()

  if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('*')) return false

  return trimmed.endsWith(';')
}

for (const root of roots) {
  const files = await collectFiles(root)

  for (const file of files) {
    const source = await readFile(file, 'utf8')
    const lines = source.split(/\r?\n/)

    lines.forEach((line, index) => {
      if (line.length > 120) issues.push(`${relative('.', file)}:${index + 1} exceeds 120 characters`)
      if (lineHasForbiddenSemicolon(line)) issues.push(`${relative('.', file)}:${index + 1} has a forbidden semicolon`)
    })
  }
}

if (issues.length > 0) {
  console.error(issues.join('\n'))
  process.exit(1)
}

console.info('Standard style checks passed: no semicolons and max 120 characters per line')
