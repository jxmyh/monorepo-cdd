import { describe, it, expect, vi } from "vitest";
import { useCounter } from "./index";

describe("useCounter", () => {
  describe("基础功能", () => {
    it("应该使用默认值初始化", () => {
      const { count } = useCounter();
      expect(count.value).toBe(0);
    });

    it("应该使用自定义初始值初始化", () => {
      const { count } = useCounter({ initialValue: 10 });
      expect(count.value).toBe(10);
    });

    it("应该能够增加计数", () => {
      const { count, increment } = useCounter();
      increment();
      expect(count.value).toBe(1);
      increment();
      expect(count.value).toBe(2);
    });

    it("应该能够减少计数", () => {
      const { count, decrement } = useCounter();
      decrement();
      expect(count.value).toBe(-1);
      decrement();
      expect(count.value).toBe(-2);
    });

    it("应该能够重置计数", () => {
      const { count, increment, reset } = useCounter({ initialValue: 5 });
      increment();
      expect(count.value).toBe(6);
      reset();
      expect(count.value).toBe(5);
    });

    it("应该能够设置指定值", () => {
      const { count, set } = useCounter();
      set(10);
      expect(count.value).toBe(10);
      set(-5);
      expect(count.value).toBe(-5);
    });
  });

  describe("边界检查", () => {
    it("不应该超过最大值", () => {
      const { count, increment } = useCounter({
        initialValue: 95,
        max: 100,
        step: 10,
      });
      increment();
      expect(count.value).toBe(100);
      increment();
      expect(count.value).toBe(100); // 保持在最大值
    });

    it("不应该低于最小值", () => {
      const { count, decrement } = useCounter({
        initialValue: 5,
        min: 0,
        step: 10,
      });
      decrement();
      expect(count.value).toBe(0);
      decrement();
      expect(count.value).toBe(0); // 保持在最小值
    });

    it("应该在范围内设置值", () => {
      const { count, set } = useCounter({ min: 0, max: 10 });
      set(15);
      expect(count.value).toBe(10); // 限制在最大值
      set(-5);
      expect(count.value).toBe(0); // 限制在最小值
    });

    it("应该将初始值限制在范围内", () => {
      const { count: count1 } = useCounter({
        initialValue: 150,
        min: 0,
        max: 100,
      });
      expect(count1.value).toBe(100);

      const { count: count2 } = useCounter({
        initialValue: -50,
        min: 0,
        max: 100,
      });
      expect(count2.value).toBe(0);
    });
  });

  describe("步长", () => {
    it("应该使用自定义步长增加", () => {
      const { count, increment } = useCounter({ step: 5 });
      increment();
      expect(count.value).toBe(5);
      increment();
      expect(count.value).toBe(10);
    });

    it("应该使用自定义步长减少", () => {
      const { count, decrement } = useCounter({ step: 5 });
      decrement();
      expect(count.value).toBe(-5);
      decrement();
      expect(count.value).toBe(-10);
    });
  });

  describe("状态查询", () => {
    it("应该正确检测是否达到最小值", () => {
      const { isMin, decrement } = useCounter({
        initialValue: 1,
        min: 0,
      });
      expect(isMin.value).toBe(false);
      decrement();
      expect(isMin.value).toBe(true);
    });

    it("应该正确检测是否达到最大值", () => {
      const { isMax, increment } = useCounter({
        initialValue: 99,
        max: 100,
      });
      expect(isMax.value).toBe(false);
      increment();
      expect(isMax.value).toBe(true);
    });

    it("应该在无边界时返回 false", () => {
      const { isMin, isMax } = useCounter();
      expect(isMin.value).toBe(false);
      expect(isMax.value).toBe(false);
    });
  });

  describe("配置验证", () => {
    it("当 min > max 时应该输出警告", () => {
      const consoleSpy = vi.spyOn(console, "warn");
      useCounter({ min: 100, max: 0 });
      expect(consoleSpy).toHaveBeenCalledWith(
        "[useCounter] min should not be greater than max",
      );
      consoleSpy.mockRestore();
    });
  });

  describe("返回值类型", () => {
    it("应该返回所有必需的方法", () => {
      const result = useCounter();
      expect(result).toHaveProperty("count");
      expect(result).toHaveProperty("increment");
      expect(result).toHaveProperty("decrement");
      expect(result).toHaveProperty("reset");
      expect(result).toHaveProperty("set");
      expect(result).toHaveProperty("isMin");
      expect(result).toHaveProperty("isMax");
    });

    it("count 应该是响应式的 ref", () => {
      const { count } = useCounter();
      expect(count.value).toBeDefined();
      expect(typeof count.value).toBe("number");
    });

    it("isMin 和 isMax 应该是响应式的 ref", () => {
      const { isMin, isMax } = useCounter();
      expect(isMin.value).toBeDefined();
      expect(isMax.value).toBeDefined();
      expect(typeof isMin.value).toBe("boolean");
      expect(typeof isMax.value).toBe("boolean");
    });
  });
});
