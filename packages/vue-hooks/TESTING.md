# 测试指南

本项目使用 **Vitest** 进行单元测试，每个 Hook 都有对应的测试文件。

## 📁 测试文件结构

```
src/
└── useCounter/
    ├── index.ts          # Hook 实现
    ├── index.md          # 文档
    └── index.test.ts     # 测试文件 ⭐
```

**命名规范：**

- 测试文件必须命名为 `index.test.ts`
- 与 Hook 实现放在同一目录下

## 🚀 运行测试

### 基本命令

```bash
# 运行所有测试（监听模式）
pnpm test

# 运行所有测试（单次执行）
pnpm test:run

# 生成覆盖率报告
pnpm test:coverage
```

### 监听模式

```bash
pnpm test
```

在监听模式下，修改代码会自动重新运行相关测试。

**快捷键：**

- `a` - 运行所有测试
- `f` - 只运行失败的测试
- `u` - 更新快照
- `q` - 退出

### 运行特定测试

```bash
# 运行特定文件的测试
pnpm test src/useCounter/index.test.ts

# 运行匹配模式的测试
pnpm test -t "基础功能"
```

## 📝 编写测试

### 测试模板

复制 `scripts/test-template.ts` 作为起点：

```typescript
import { describe, it, expect } from "vitest";
import { useXxx } from "./index";

describe("useXxx", () => {
  describe("基础功能", () => {
    it("应该正确初始化", () => {
      // 测试代码
    });
  });
});
```

### 测试结构

每个 Hook 的测试应包含以下部分：

#### 1. 基础功能测试

```typescript
describe("基础功能", () => {
  it("应该使用默认值初始化", () => {
    const { value } = useXxx();
    expect(value.value).toBe(expectedValue);
  });

  it("应该支持自定义配置", () => {
    const { value } = useXxx({ customOption: "value" });
    expect(value.value).toBe(expectedValue);
  });
});
```

#### 2. 核心方法测试

```typescript
describe("核心方法", () => {
  it("应该能够执行主要操作", () => {
    const { value, action } = useXxx();
    action();
    expect(value.value).toBe(newValue);
  });
});
```

#### 3. 边界情况测试

```typescript
describe("边界情况", () => {
  it("应该处理边界值", () => {
    const { value } = useXxx({ min: 0, max: 10 });
    // 测试边界行为
  });

  it("应该处理无效输入", () => {
    // 测试错误处理
  });
});
```

#### 4. 返回值测试

```typescript
describe("返回值", () => {
  it("应该返回所有必需的方法和属性", () => {
    const result = useXxx();
    expect(result).toHaveProperty("value");
    expect(result).toHaveProperty("method");
  });

  it("应该是响应式的", () => {
    const { value } = useXxx();
    expect(value.value).toBeDefined();
  });
});
```

### 实际示例

参考现有的测试文件：

- [useCounter 测试](../src/useCounter/index.test.ts)
- [useToggle 测试](../src/useToggle/index.test.ts)

## ✅ 测试最佳实践

### 1. 测试命名

使用清晰的中文描述：

```typescript
it("应该使用默认值初始化", () => {});
it("不应该超过最大值", () => {});
it("当 min > max 时应该输出警告", () => {});
```

### 2. AAA 模式

遵循 Arrange-Act-Assert 模式：

```typescript
it("应该能够增加计数", () => {
  // Arrange - 准备
  const { count, increment } = useCounter();

  // Act - 执行
  increment();

  // Assert - 断言
  expect(count.value).toBe(1);
});
```

### 3. 测试独立性

每个测试应该独立，不依赖其他测试：

```typescript
// ✅ 好 - 独立的测试
it("测试 1", () => {
  const { count } = useCounter();
  // ...
});

it("测试 2", () => {
  const { count } = useCounter(); // 重新初始化
  // ...
});

// ❌ 坏 - 依赖其他测试
let counter;
it("测试 1", () => {
  counter = useCounter();
});
it("测试 2", () => {
  // 依赖测试 1 的状态
});
```

### 4. 覆盖边界情况

```typescript
// 测试边界值
it("不应该超过最大值", () => {});
it("不应该低于最小值", () => {});

// 测试空值/未定义
it("应该处理 undefined 输入", () => {});

// 测试极端值
it("应该处理极大的数值", () => {});
```

### 5. 测试错误处理

```typescript
it("当配置无效时应该输出警告", () => {
  const consoleSpy = vi.spyOn(console, "warn");
  useCounter({ min: 100, max: 0 });
  expect(consoleSpy).toHaveBeenCalledWith(expect.any(String));
  consoleSpy.mockRestore();
});
```

## 📊 测试覆盖率

### 查看覆盖率

```bash
pnpm test:coverage
```

会生成 HTML 报告在 `coverage/` 目录。

### 覆盖率目标

- **Statements**: ≥ 90%
- **Branches**: ≥ 85%
- **Functions**: ≥ 90%
- **Lines**: ≥ 90%

## 🔧 Vitest 配置

配置文件：`vitest.config.ts`

```typescript
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // 全局 API（describe, it, expect）
    environment: "jsdom", // 模拟浏览器环境
    include: ["src/**/*.test.ts"], // 测试文件匹配
    coverage: {
      provider: "v8", // 覆盖率工具
      reporter: ["text", "json", "html"],
    },
  },
});
```

## 🎯 添加新 Hook 的测试

### 步骤 1：创建测试文件

```bash
mkdir src/useMyHook
touch src/useMyHook/index.ts
touch src/useMyHook/index.test.ts
```

### 步骤 2：复制模板

```bash
cp scripts/test-template.ts src/useMyHook/index.test.ts
```

### 步骤 3：编写测试

根据 Hook 的功能填写测试用例。

### 步骤 4：运行测试

```bash
pnpm test src/useMyHook/index.test.ts
```

### 步骤 5：检查覆盖率

```bash
pnpm test:coverage
```

## 💡 常见测试场景

### 1. 测试响应式更新

```typescript
it("应该响应式更新", async () => {
  const { value, update } = useMyHook();

  expect(value.value).toBe("initial");

  update("new");
  await nextTick();

  expect(value.value).toBe("new");
});
```

### 2. 测试计算属性

```typescript
it("应该正确计算派生值", () => {
  const { count, isMax } = useCounter({ max: 10 });

  expect(isMax.value).toBe(false);

  count.value = 10;
  expect(isMax.value).toBe(true);
});
```

### 3. 测试副作用

```typescript
it("应该执行副作用", () => {
  const callback = vi.fn();
  const { trigger } = useMyHook({ onEvent: callback });

  trigger();
  expect(callback).toHaveBeenCalled();
});
```

### 4. 测试异步操作

```typescript
it("应该正确处理异步", async () => {
  const { fetchData } = useMyHook();

  const result = await fetchData();
  expect(result).toBeDefined();
});
```

## 🐛 调试测试

### 1. 单独运行一个测试

```bash
pnpm test -t "应该使用默认值初始化"
```

### 2. 使用 .only

```typescript
it.only("只运行这个测试", () => {
  // ...
});
```

### 3. 跳过测试

```typescript
it.skip("暂时跳过这个测试", () => {
  // ...
});
```

### 4. 添加日志

```typescript
it("调试测试", () => {
  const result = useMyHook();
  console.log("Result:", result); // 查看输出
  expect(result).toBeDefined();
});
```

## 📚 相关资源

- [Vitest 官方文档](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Testing Library](https://testing-library.com/)

## ✨ 示例：完整的测试套件

查看现有 Hook 的完整测试：

- **[useCounter](../src/useCounter/index.test.ts)** - 19 个测试用例
  - 基础功能（6 个）
  - 边界检查（4 个）
  - 步长（2 个）
  - 状态查询（3 个）
  - 配置验证（1 个）
  - 返回值类型（3 个）

- **[useToggle](../src/useToggle/index.test.ts)** - 16 个测试用例
  - 基础功能（4 个）
  - 设置方法（3 个）
  - 返回值类型（4 个）
  - 实际场景（3 个）
  - 边界情况（2 个）
