import { describe, expect, it } from "vitest";

import { darkColors, lightColors } from "./colors";

describe("Academic-X Theme", () => {
  it("should have the same color keys in light and dark themes", () => {
    expect(Object.keys(lightColors).sort()).toEqual(
      Object.keys(darkColors).sort(),
    );
  });

  it("should define a background and card color", () => {
    expect(lightColors.background).toBeTruthy();
    expect(lightColors.card).toBeTruthy();

    expect(darkColors.background).toBeTruthy();
    expect(darkColors.card).toBeTruthy();
  });

  it("should define skeleton loading colors", () => {
    expect(lightColors.skeleton).toBeTruthy();
    expect(darkColors.skeleton).toBeTruthy();
  });
});
