#!/usr/bin/env node

/**
 * 自动同步 hooks 文档
 * 从 src/useXxx/index.md 复制到 docs/api/useXxx/index.md
 */

import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

const srcDir = resolve(__dirname, '../src')
const docsApiDir = resolve(__dirname, '../docs/api')

console.log('📚 Syncing hooks documentation...\n')

// 获取所有 use* 目录
const hookDirs = readdirSync(srcDir).filter(dir => {
  const fullPath = resolve(srcDir, dir)
  return dir.startsWith('use') && statSync(fullPath).isDirectory()
})

if (hookDirs.length === 0) {
  console.log('No hooks found in src directory.')
  process.exit(0)
}

console.log(`Found ${hookDirs.length} hook(s):\n`)

hookDirs.forEach(hookName => {
  const srcMd = resolve(srcDir, hookName, 'index.md')
  const destDir = resolve(docsApiDir, hookName)
  const destMd = resolve(destDir, 'index.md')

  // 检查源文件是否存在
  if (!existsSync(srcMd)) {
    console.warn(`⚠️  Warning: ${hookName}/index.md not found, skipping...`)
    return
  }

  // 创建目标目录
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true })
  }

  // 复制文件
  copyFileSync(srcMd, destMd)
  console.log(`✅ ${hookName}/index.md -> docs/api/${hookName}/index.md`)
})

console.log('\n✨ Documentation synced successfully!')
