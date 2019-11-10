import nextId, { resetId, setPrefix } from "./nextId";

afterEach(() => {
  resetId();
  setPrefix("id");
});

describe("nextId", () => {
  it("generates unique id", () => {
    for (let i = 1; i < 10; i++) {
      expect(nextId()).toBe(`id${i}`);
    }
  });

  it("takes global prefix", () => {
    setPrefix("test-");
    expect(nextId()).toBe("test-1");
    expect(nextId()).toBe("test-2");
    setPrefix("abc@");
    expect(nextId()).toBe("abc@3");
  });

  it("takes prefix", () => {
    expect(nextId("test-")).toBe("test-1");
    expect(nextId("test-")).toBe("test-2");
    expect(nextId("abc@")).toBe("abc@3");
  });

  it("takes local prefix over global prefix", () => {
    setPrefix("test-");
    expect(nextId()).toBe("test-1");
    expect(nextId("abc@")).toBe("abc@2");
  });
});

describe("resetId", () => {
  it("resets the id", () => {
    for (let i = 1; i < 10; i++) {
      resetId();
      expect(nextId()).toBe("id1");
    }
  });
});
