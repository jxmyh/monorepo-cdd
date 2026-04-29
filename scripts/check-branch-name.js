#!/usr/bin/env node

/**
 * 分支命名规范检查脚本
 *
 * 分支命名格式：一级目录_可能二级_可能三级_v1.0.0(版本号)_开发人员
 *
 * 示例：
 * - apps_web-app_v1.0.0_zhangsan
 * - packages_ui_v2.1.0_lisi
 * - config_vite-config_v1.0.0_wangwu
 * - feature_user-login_v1.0.0_zhaoliu
 */

import { execSync } from 'child_process'
import process from 'process'

// 分支命名规则
const BRANCH_PATTERN = /^[a-z0-9]+(_[a-z0-9-]+)*_v\d+\.\d+\.\d+_[a-z0-9]+$/

// 允许的跳过检查的环境变量
const SKIP_CHECK = process.env.SKIP_BRANCH_CHECK === 'true'

/**
 * 获取当前分支名
 */
function getCurrentBranch() {
  try {
    const branch = execSync('git rev-parse --abbrev-ref HEAD', {
      encoding: 'utf-8',
    }).trim()
    return branch
  } catch (error) {
    console.error('❌ 无法获取当前分支名')
    process.exit(1)
  }
}

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
    return { valid: true, message: '分支名称符合规范' }
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
  if (branchName.includes('-') && !branchName.match(/^[a-z0-9]+(_[a-z0-9-]+)*_/)) {
    errors.push('应使用下划线分隔各部分')
  }

  // 检查是否全小写
  if (/[A-Z]/.test(branchName)) {
    errors.push('分支名称应全部小写')
  }

  return {
    valid: false,
    message: `分支名称不符合规范：\n${errors.map((e) => `  - ${e}`).join('\n')}`,
  }
}

/**
 * 显示使用示例
 */
function showExamples() {
  console.log('\n📋 分支命名示例：')
  console.log('  ✅ apps_web-app_v1.0.0_zhangsan')
  console.log('  ✅ packages_ui_v2.1.0_lisi')
  console.log('  ✅ config_vite-config_v1.0.0_wangwu')
  console.log('  ✅ feature_user-login_v1.0.0_zhaoliu')
  console.log('  ✅ hotfix_login-bug_v1.0.1_chenqi')
  console.log('\n📝 格式说明：')
  console.log('  <一级目录>_<可能二级>_<可能三级>_v<版本号>_<开发人员>')
  console.log('  - 使用下划线分隔')
  console.log('  - 全部小写')
  console.log('  - 必须包含版本号（vX.Y.Z）')
  console.log('  - 必须包含开发人员姓名\n')
}

/**
 * 主函数
 */
function main() {
  // 如果设置了跳过检查，直接通过
  if (SKIP_CHECK) {
    console.log('⚠️  跳过分支名称检查（SKIP_BRANCH_CHECK=true）')
    process.exit(0)
  }

  const branchName = getCurrentBranch()
  console.log(`🔍 检查分支名称: ${branchName}`)

  const result = validateBranchName(branchName)

  if (result.valid) {
    console.log(`✅ ${result.message}`)
    process.exit(0)
  } else {
    console.error(`❌ ${result.message}`)
    showExamples()
    console.error('\n💡 提示：')
    console.error('  如需跳过检查，设置环境变量：SKIP_BRANCH_CHECK=true')
    console.error('  例如：SKIP_BRANCH_CHECK=true git push\n')
    process.exit(1)
  }
}

main()
