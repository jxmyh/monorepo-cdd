import { describe, it, expect } from "vitest";
import { useToggle } from "./index";

describe("useToggle", () => {
  describe("基础功能", () => {
    it("应该使用默认值 false 初始化", () => {
      const { value } = useToggle();
      expect(value.value).toBe(false);
    });

    it("应该使用自定义初始值初始化", () => {
      const { value } = useToggle(true);
      expect(value.value).toBe(true);
    });

    it("应该能够切换值", () => {
      const { value, toggle } = useToggle(false);
      expect(value.value).toBe(false);
      toggle();
      expect(value.value).toBe(true);
      toggle();
      expect(value.value).toBe(false);
    });

    it("应该能够从 true 切换到 false", () => {
      const { value, toggle } = useToggle(true);
      expect(value.value).toBe(true);
      toggle();
      expect(value.value).toBe(false);
    });
  });

  describe("设置方法", () => {
    it("应该能够设置为 true", () => {
      const { value, setTrue } = useToggle(false);
      expect(value.value).toBe(false);
      setTrue();
      expect(value.value).toBe(true);
    });

    it("应该能够设置为 false", () => {
      const { value, setFalse } = useToggle(true);
      expect(value.value).toBe(true);
      setFalse();
      expect(value.value).toBe(false);
    });

    it("多次设置应该保持值不变", () => {
      const { value, setTrue } = useToggle(false);
      setTrue();
      expect(value.value).toBe(true);
      setTrue();
      expect(value.value).toBe(true); // 保持 true
    });
  });

  describe("返回值类型", () => {
    it("应该返回所有必需的方法", () => {
      const result = useToggle();
      expect(result).toHaveProperty("value");
      expect(result).toHaveProperty("toggle");
      expect(result).toHaveProperty("setTrue");
      expect(result).toHaveProperty("setFalse");
    });

    it("value 应该是响应式的 ref", () => {
      const { value } = useToggle();
      expect(value.value).toBeDefined();
      expect(typeof value.value).toBe("boolean");
    });

    it("toggle 应该是一个函数", () => {
      const { toggle } = useToggle();
      expect(typeof toggle).toBe("function");
    });

    it("setTrue 和 setFalse 应该是函数", () => {
      const { setTrue, setFalse } = useToggle();
      expect(typeof setTrue).toBe("function");
      expect(typeof setFalse).toBe("function");
    });
  });

  describe("实际场景", () => {
    it("应该能够用于显示/隐藏控制", () => {
      const { value: isVisible, toggle } = useToggle(false);

      expect(isVisible.value).toBe(false);
      toggle();
      expect(isVisible.value).toBe(true);
      toggle();
      expect(isVisible.value).toBe(false);
    });

    it("应该能够用于深色模式切换", () => {
      const { value: isDark, toggle, setTrue, setFalse } = useToggle(false);

      expect(isDark.value).toBe(false);
      setTrue();
      expect(isDark.value).toBe(true);
      toggle();
      expect(isDark.value).toBe(false);
      setFalse();
      expect(isDark.value).toBe(false);
    });

    it("应该能够用于表单验证状态", () => {
      const { value: isValid, setTrue, setFalse } = useToggle(true);

      expect(isValid.value).toBe(true);
      setFalse();
      expect(isValid.value).toBe(false);
      setTrue();
      expect(isValid.value).toBe(true);
    });
  });

  describe("边界情况", () => {
    it("应该处理快速连续切换", () => {
      const { value, toggle } = useToggle(false);

      toggle();
      toggle();
      toggle();
      toggle();

      expect(value.value).toBe(false); // 偶数次切换回到原值
    });

    it("应该处理重复设置相同值", () => {
      const { value, setTrue } = useToggle(true);

      setTrue();
      setTrue();
      setTrue();

      expect(value.value).toBe(true);
    });
  });
});
