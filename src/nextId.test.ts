import nextId, { resetId, setPrefix } from "./nextId";

describe("nextId", () => {
  beforeEach(() => {
    resetId();
    setPrefix();
  });

  test("generates unique id", () => {
    for (let i = 1; i < 10; i++) {
      expect(nextId()).toBe(`id${i}`);
    }
  });

  test("resetId resets the id", () => {
    for (let i = 1; i < 10; i++) {
      resetId();
      expect(nextId()).toBe("id1");
    }
  });

  test("nextId takes global prefix", () => {
    setPrefix("test-");
    expect(nextId()).toBe("test-1");
    expect(nextId()).toBe("test-2");
    setPrefix("abc@");
    expect(nextId()).toBe("abc@3");
  });

  test("nextId takes prefix", () => {
    expect(nextId("test-")).toBe("test-1");
    expect(nextId("test-")).toBe("test-2");
    expect(nextId("abc@")).toBe("abc@3");
  });

  test("nextId takes local prefix over global prefix", () => {
    setPrefix("test-");
    expect(nextId()).toBe("test-1");
    expect(nextId("abc@")).toBe("abc@2");
  });
});
