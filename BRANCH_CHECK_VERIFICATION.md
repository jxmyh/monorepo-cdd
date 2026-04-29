# 分支检测功能验证指南

## ✅ 功能状态

分支创建检测功能**正常工作**！

---

## 🧪 验证步骤

### 1. 确保环境变量已清除

**Windows PowerShell:**

```powershell
# 检查是否设置了 SKIP_BRANCH_CHECK
echo $env:SKIP_BRANCH_CHECK

# 如果显示 "true"，需要清除
Remove-Item Env:\SKIP_BRANCH_CHECK

# 再次确认（应该为空）
echo $env:SKIP_BRANCH_CHECK
```

**Linux/macOS:**

```bash
# 检查环境变量
echo $SKIP_BRANCH_CHECK

# 如果显示 "true"，需要清除
unset SKIP_BRANCH_CHECK
```

---

### 2. 测试不符合规范的分支名

```bash
git checkout -b test_wrong_name
```

**预期输出：**

```
Switched to a new branch 'test_wrong_name'

🔍 检查新分支名称: test_wrong_name

❌ 分支名称不符合规范：
  ❌ 缺少版本号（格式：v1.0.0）

📋 正确的分支命名示例：
  ✅ apps_web-app_v1.0.0_zhangsan
  ...

💡 修正建议：
  建议格式：test_wrong_name_v1.0.0_<你的名字>
```

✅ **如果看到上述提示，说明检测正常工作！**

---

### 3. 测试符合规范的分支名

```bash
git checkout -b apps_test_v1.0.0_user
```

**预期输出：**

```
Switched to a new branch 'apps_test_v1.0.0_user'

🔍 检查新分支名称: apps_test_v1.0.0_user
✅ 分支名称符合规范 ✅
```

✅ **如果看到成功提示，说明检测正常工作！**

---

### 4. 清理测试分支

```bash
git checkout main
git branch -D test_wrong_name apps_test_v1.0.0_user
```

---

## 🎯 VSCode 图形界面测试

### 在 VSCode 中创建分支

1. **打开 VSCode**
2. **点击左下角的分支名称**（或使用 `Ctrl+Shift+P` → "Git: Checkout to..."）
3. **选择 "Create new branch..."**
4. **输入分支名：** `test_vscode_branch`
5. **观察终端输出**

**预期结果：**

- 应该看到分支名称检查提示
- 如果不符合规范，会显示错误信息

---

## ❓ 常见问题

### Q1: 为什么有时检测不工作？

**可能原因：**

1. ✅ **环境变量设置了 SKIP_BRANCH_CHECK=true**
   - 解决：清除环境变量
2. ✅ **Hook 文件没有执行权限**
   - 解决：`chmod +x .husky/post-checkout`
3. ✅ **是特殊分支（main/master/develop/dev）**
   - 这些分支会被跳过检查

---

### Q2: 如何永久禁用检测？

**不推荐，但可以这样做：**

**方法 1：重命名 hook 文件**

```bash
mv .husky/post-checkout .husky/post-checkout.bak
```

**方法 2：设置永久环境变量**

Windows PowerShell Profile:

```powershell
# 编辑 profile
notepad $PROFILE

# 添加这一行
$env:SKIP_BRANCH_CHECK = "true"
```

Linux/macOS:

```bash
# 编辑 .bashrc 或 .zshrc
echo 'export SKIP_BRANCH_CHECK=true' >> ~/.bashrc
source ~/.bashrc
```

---

### Q3: 只想临时跳过某次检查？

```bash
# Windows PowerShell
$env:SKIP_BRANCH_CHECK="true"; git checkout -b temp-branch

# Linux/macOS
SKIP_BRANCH_CHECK=true git checkout -b temp-branch
```

---

## 📊 检测时机说明

### Post-checkout Hook 触发条件

| 操作                       | 是否触发 | 说明            |
| -------------------------- | -------- | --------------- |
| `git checkout -b <branch>` | ✅ 是    | 创建并切换分支  |
| `git branch <branch>`      | ❌ 否    | 仅创建，不切换  |
| `git checkout <branch>`    | ✅ 是    | 切换已有分支    |
| `git switch <branch>`      | ✅ 是    | 切换分支        |
| VSCode 图形界面创建        | ✅ 是    | 会执行 checkout |

### 新分支判断逻辑

```bash
# 获取当前分支的 reflog 记录数
REFLOG_COUNT=$(git reflog show "$BRANCH_NAME" | wc -l)

# 如果 <= 2，认为是新创建的分支
if [ "$REFLOG_COUNT" -le 2 ]; then
  node scripts/check-branch-on-create.js
fi
```

**为什么用 reflog？**

- 新分支的 reflog 记录很少（通常 1-2 条）
- 已有分支的 reflog 记录较多
- 可以区分"新创建"和"切换到已有分支"

---

## 🔍 故障排除

### 问题：创建分支时没有任何提示

**排查步骤：**

1. **检查环境变量**

   ```powershell
   echo $env:SKIP_BRANCH_CHECK
   # 应该为空，如果显示 "true" 需要清除
   ```

2. **检查 hook 文件是否存在**

   ```bash
   ls -la .husky/post-checkout
   # 应该显示文件存在
   ```

3. **检查 hook 文件权限**

   ```bash
   # Linux/macOS
   ls -la .husky/post-checkout
   # 应该有执行权限 (x)

   # 如果没有，添加权限
   chmod +x .husky/post-checkout
   ```

4. **手动运行检查脚本**

   ```bash
   node scripts/check-branch-on-create.js
   # 应该显示当前分支的检查结果
   ```

5. **检查 Git 配置**
   ```bash
   git config core.hooksPath
   # 应该为空或指向 .husky
   ```

---

### 问题：每次切换分支都检查

**原因：** reflog 判断可能不够准确

**解决方案：**
调整 `.husky/post-checkout` 中的阈值：

```bash
# 当前：<= 2 视为新分支
if [ "$REFLOG_COUNT" -le 2 ]; then

# 可以调整为更严格的条件
if [ "$REFLOG_COUNT" -le 1 ]; then
```

---

## ✨ 总结

### 检测功能状态

✅ **Post-checkout hook 正常工作**  
✅ **能够检测新创建的分支**  
✅ **提供清晰的错误提示和修正建议**  
✅ **支持 SKIP_BRANCH_CHECK 环境变量跳过**

### 注意事项

⚠️ **PowerShell 环境变量会 persist 在当前会话中**  
⚠️ **需要手动清除或重启终端**  
⚠️ **VSCode 图形界面也会触发检测**

### 推荐做法

✅ **日常开发遵循分支命名规范**  
✅ **只在紧急情况下使用 SKIP_BRANCH_CHECK**  
✅ **定期清理测试分支**  
✅ **遇到问题先检查环境变量**

---

**最后更新**: 2024-01-01  
**状态**: ✅ 功能正常
