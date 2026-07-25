import { z } from "zod";

const environmentSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  })
  .passthrough();

export function validateEnvironment(
  environment: Record<string, string | undefined> = process.env,
) {
  return environmentSchema.parse(environment);
}
