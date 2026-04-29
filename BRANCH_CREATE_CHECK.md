# 分支创建时检测功能说明

## ✅ 功能已实现

现在在创建分支时会**立即检测**分支名称是否符合规范！

---

## 🎯 工作原理

### Post-checkout Hook 改进

**文件：** `.husky/post-checkout`

**检测逻辑：**

1. 检测到分支切换（`git checkout -b`）
2. 获取当前分支名
3. 跳过特殊分支（main/master/develop/dev）
4. 检查 reflog 记录数（<=2 表示新分支）
5. 运行分支名称检查脚本

---

## 📝 使用示例

### 示例 1：创建不符合规范的分支

```bash
$ git checkout -b test_wrong_name

Switched to a new branch 'test_wrong_name'

🔍 检查新分支名称: test_wrong_name

❌ 分支名称不符合规范：
  ❌ 缺少版本号（格式：v1.0.0）

📋 正确的分支命名示例：
  ✅ apps_web-app_v1.0.0_zhangsan
  ✅ packages_ui_v2.1.0_lisi
  ✅ config_vite-config_v1.0.0_wangwu

💡 修正建议：
  建议格式：test_wrong_name_v1.0.0_<你的名字>
  例如：test_wrong_name_v1.0.0_zhangsan

⚠️  提示：
  如需跳过检查，设置环境变量：SKIP_BRANCH_CHECK=true
```

**结果：** ⚠️ 显示警告，但分支仍然创建（不阻止）

---

### 示例 2：创建符合规范的分支

```bash
$ git checkout -b apps_test_v1.0.0_cdd

Switched to a new branch 'apps_test_v1.0.0_cdd'

🔍 检查新分支名称: apps_test_v1.0.0_cdd
✅ 分支名称符合规范 ✅
```

**结果：** ✅ 显示成功消息

---

## 🔧 技术实现

### 检测时机

**Post-checkout Hook** 在以下情况触发：

- `git checkout <branch>` - 切换分支
- `git checkout -b <branch>` - 创建并切换分支
- `git switch <branch>` - 切换分支

### 检测逻辑

```bash
# 1. 只在分支切换时检查
if [ "$3" = "1" ]; then

  # 2. 获取当前分支名
  BRANCH_NAME=$(git rev-parse --abbrev-ref HEAD)

  # 3. 跳过特殊分支
  if [ "$BRANCH_NAME" = "main" ] || ...; then
    exit 0
  fi

  # 4. 检查是否是新分支（reflog 记录 <= 2）
  REFLOG_COUNT=$(git reflog show "$BRANCH_NAME" | wc -l)

  if [ "$REFLOG_COUNT" -le 2 ]; then
    # 5. 运行检查脚本
    node scripts/check-branch-on-create.js
  fi
fi
```

### 为什么用 reflog？

- **可靠**：每个分支操作都会记录到 reflog
- **准确**：新分支的 reflog 记录很少（通常 1-2 条）
- **通用**：适用于所有 Git 版本

---

## 📊 完整的分支检查流程

现在有**三层检查**：

### 1️⃣ 创建分支时（警告）

```bash
git checkout -b branch-name
  ↓
post-checkout hook
  ↓
检查分支名称
  ↓
✅ 符合 → 显示成功
❌ 不符合 → 显示警告（但不阻止）
```

**目的：** 即时反馈，帮助开发者养成好习惯

---

### 2️⃣ 推送前（强制）

```bash
git push
  ↓
pre-push hook
  ↓
检查分支名称
  ↓
✅ 符合 → 允许推送
❌ 不符合 → 拒绝推送
```

**目的：** 最终保障，确保远程仓库的分支都符合规范

---

### 3️⃣ 手动检查

```bash
node scripts/check-branch-name.js
```

**目的：** 随时验证当前分支名称

---

## 💡 最佳实践

### 推荐的开发流程

```bash
# 1. 创建分支（会立即检查）
git checkout -b apps_web-app_v1.0.0_zhangsan

# 如果看到警告，立即修正
git checkout main
git branch -D apps_web-app_v1.0.0_zhangsan
git checkout -b apps_web-app_v1.0.0_zhangsan  # 正确的名称

# 2. 开发和提交
git add .
git commit -m "feat: add feature"

# 3. 推送（再次检查）
git push origin apps_web-app_v1.0.0_zhangsan
```

### 如果忘记遵循规范

```bash
# 情况 1: 刚创建就发现错误
git checkout main
git branch -D wrong-name
git checkout -b correct_name_v1.0.0_user

# 情况 2: 已经开发了一段时间
git branch -m wrong-name correct_name_v1.0.0_user
git push origin --delete wrong-name
git push origin correct_name_v1.0.0_user
```

---

## ⚙️ 配置选项

### 跳过检查（不推荐）

```bash
# 临时跳过
SKIP_BRANCH_CHECK=true git checkout -b temp-branch

# 或在 Windows PowerShell 中
$env:SKIP_BRANCH_CHECK="true"; git checkout -b temp-branch
```

### 修改检查阈值

如果想调整"新分支"的判断标准，修改 `.husky/post-checkout`：

```bash
# 当前：reflog 记录 <= 2 视为新分支
if [ "$REFLOG_COUNT" -le 2 ]; then

# 可以调整为其他值，如 <= 3
if [ "$REFLOG_COUNT" -le 3 ]; then
```

---

## 🔍 故障排除

### Q1: 创建分支时没有检查？

**可能原因：**

1. Hook 文件没有执行权限
2. 是特殊分支（main/master/develop/dev）
3. 分支已经存在（不是新创建）

**解决方案：**

```bash
# 检查权限
ls -la .husky/post-checkout

# 添加执行权限（如果需要）
chmod +x .husky/post-checkout

# 确认不是特殊分支
git branch  # 查看当前分支
```

---

### Q2: 每次切换分支都检查？

**原因：** reflog 判断可能不准确

**解决方案：**
调整阈值或改用其他检测方法

---

### Q3: 想完全禁用创建时检查？

**方案 1：** 删除或注释掉 post-checkout hook

```bash
# 重命名文件（禁用）
mv .husky/post-checkout .husky/post-checkout.bak
```

**方案 2：** 设置环境变量

```bash
# 在 .bashrc 或 .zshrc 中添加
export SKIP_BRANCH_CHECK=true
```

---

## 📈 效果对比

### 改进前

```bash
$ git checkout -b wrong-name
Switched to a new branch 'wrong-name'
# ❌ 没有任何提示

$ git push
# ❌ 推送时才被发现，需要重新创建分支
```

### 改进后

```bash
$ git checkout -b wrong-name
Switched to a new branch 'wrong-name'

🔍 检查新分支名称: wrong-name
❌ 分支名称不符合规范：
  ❌ 缺少版本号
  ❌ 缺少开发人员姓名

💡 建议：wrong_name_v1.0.0_user
# ✅ 立即发现问题，可以马上修正

$ git checkout -b correct_name_v1.0.0_user
Switched to a new branch 'correct_name_v1.0.0_user'
✅ 分支名称符合规范 ✅
# ✅ 即时正面反馈
```

---

## ✨ 总结

### 优势

✅ **即时反馈** - 创建时就知道是否正确  
✅ **友好提示** - 显示错误原因和修正建议  
✅ **不阻塞流程** - 警告而非阻止，给予灵活性  
✅ **双重保障** - 创建时警告 + 推送时强制  
✅ **易于学习** - 帮助团队快速掌握规范

### 工作流程

```
创建分支 → 即时检查（警告）→ 开发 → 提交 → 推送前检查（强制）
   ↓                                              ↓
 提醒修正                                    必须正确才能推送
```

---

**功能状态**: ✅ 已完成并测试通过  
**最后更新**: 2024-01-01  
**相关文件**: `.husky/post-checkout`, `scripts/check-branch-on-create.js`
