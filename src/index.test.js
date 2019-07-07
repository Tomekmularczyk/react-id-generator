import getId from "./index";

describe("nextId", () => {
  test("generates unique id", () => {
    for (let i = 1; i < 10; i++) {
      expect(getId()).toBe(`id${i}`);
    }
  });
});
