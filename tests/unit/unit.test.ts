import { describe, it, expect } from "vitest";

describe("Basic Unit Tests", () => {
  it("should add two numbers correctly", () => {
    const result = 2 + 3;

    expect(result).toBe(5);
  });

  it("should check a valid citizen name", () => {
    const citizenName = "Test Citizen";

    expect(citizenName).toBeTruthy();
  });
});