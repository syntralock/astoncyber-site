import { describe, expect, it } from "vitest";

import { validateEnvironment } from "@/lib/env";

describe("environment validation", () => {
  it("accepts the supported environment names", () => {
    expect(validateEnvironment({ NODE_ENV: "production" })).toMatchObject({
      NODE_ENV: "production",
    });
  });

  it("rejects an unknown environment name", () => {
    expect(() => validateEnvironment({ NODE_ENV: "staging" })).toThrow();
  });
});
