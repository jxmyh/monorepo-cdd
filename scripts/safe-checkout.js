#!/usr/bin/env node

/**
 * 安全的分支创建脚本
 *
 * 在创建分支前先检查名称是否符合规范
 * 如果不符合规范，拒绝创建分支
 */

import { execSync } from 'child_process'
import process from 'process'

// 分支命名规则
const BRANCH_PATTERN = /^[a-z0-9]+(_[a-z0-9-]+)*_v\d+\.\d+\.\d+_[a-z0-9]+$/

// 允许的跳过检查的环境变量
const SKIP_CHECK = process.env.SKIP_BRANCH_CHECK === 'true'

/**
 * 验证分支名称
 */
function validateBranchName(branchName) {
  // 特殊分支不需要检查
  const specialBranches = ['main', 'master', 'develop', 'dev']
  if (specialBranches.includes(branchName)) {
    return { valid: true, message: '特殊分支，跳过检查' }
  }

  // 检查是否匹配规范
  if (BRANCH_PATTERN.test(branchName)) {
    return { valid: true, message: '分支名称符合规范 ✅' }
  }

  // 提供详细的错误信息
  const errors = []

  // 检查是否包含版本号
  if (!/v\d+\.\d+\.\d+/.test(branchName)) {
    errors.push('缺少版本号（格式：v1.0.0）')
  }

  // 检查是否包含开发人员
  if (!/_[a-z0-9]+$/.test(branchName)) {
    errors.push('缺少开发人员姓名')
  }

  // 检查是否使用下划线分隔
  if (!branchName.includes('_')) {
    errors.push('应使用下划线分隔各部分')
  }

  // 检查是否全小写
  if (/[A-Z]/.test(branchName)) {
    errors.push('分支名称应全部小写')
  }

  return {
    valid: false,
    message: `分支名称不符合规范：\n${errors.map((e) => `  ❌ ${e}`).join('\n')}`,
  }
}

/**
 * 显示使用示例
 */
function showExamples() {
  console.log('\n📋 正确的分支命名示例：')
  console.log('  ✅ apps_web-app_v1.0.0_zhangsan')
  console.log('  ✅ packages_ui_v2.1.0_lisi')
  console.log('  ✅ config_vite-config_v1.0.0_wangwu')
  console.log('  ✅ feature_user-login_v1.0.0_zhaoliu')
  console.log('  ✅ hotfix_login-bug_v1.0.1_chenqi')
  console.log('\n📝 格式说明：')
  console.log('  <一级目录>_<可能二级>_<可能三级>_v<版本号>_<开发人员>')
  console.log('  - 使用下划线 _ 分隔')
  console.log('  - 全部小写')
  console.log('  - 必须包含版本号（vX.Y.Z）')
  console.log('  - 必须包含开发人员姓名\n')
}

/**
 * 提供修正建议
 */
function suggestFix(branchName) {
  console.log('💡 修正建议：')

  // 提取可能的组成部分
  const parts = branchName.split(/[-_]/)

  if (parts.length > 0) {
    console.log(`  建议格式：${parts.join('_')}_v1.0.0_<你的名字>`)
    console.log(`  例如：${parts.join('_')}_v1.0.0_zhangsan\n`)
  }
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2)

  // 解析参数
  let branchName = null
  let startPoint = null
  let createAndCheckout = false

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '-b' || args[i] === '-B') {
      createAndCheckout = true
      if (i + 1 < args.length) {
        branchName = args[i + 1]
        i++
      }
    } else if (args[i].startsWith('-')) {
      // 其他选项，跳过
      continue
    } else {
      // 可能是起始点
      if (!branchName) {
        // 第一个非选项参数是分支名（当没有 -b 时）
        branchName = args[i]
      } else {
        startPoint = args[i]
      }
    }
  }

  if (!branchName) {
    console.error('❌ 错误：未指定分支名称')
    console.log('\n使用方法：')
    console.log('  node scripts/safe-checkout.js -b <branch-name> [start-point]')
    console.log('  node scripts/safe-checkout.js <branch-name> [start-point]')
    process.exit(1)
  }

  console.log(`\n🔍 验证分支名称: ${branchName}`)

  // 如果设置了跳过检查，直接通过
  if (SKIP_CHECK) {
    console.log('⚠️  跳过分支名称检查（SKIP_BRANCH_CHECK=true）\n')
  } else {
    // 验证分支名称
    const result = validateBranchName(branchName)

    if (!result.valid) {
      console.error(`\n❌ ${result.message}`)
      showExamples()
      suggestFix(branchName)
      console.error('🚫 分支创建被拒绝！请先修正分支名称。\n')
      process.exit(1)
    }

    console.log(`✅ ${result.message}\n`)
  }

  // 执行实际的 git checkout 命令
  try {
    const cmd = startPoint
      ? `git checkout ${createAndCheckout ? '-b' : ''} ${branchName} ${startPoint}`
      : `git checkout ${createAndCheckout ? '-b' : ''} ${branchName}`

    console.log(`📌 执行: ${cmd}\n`)
    const output = execSync(cmd, {
      encoding: 'utf-8',
      stdio: 'inherit',
    })

    console.log('\n✅ 分支创建成功！')
    process.exit(0)
  } catch (error) {
    console.error('\n❌ Git 命令执行失败')
    process.exit(1)
  }
}

main()
