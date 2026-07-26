import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const stylesheetPath = fileURLToPath(
  new URL("../styles/globals.css", import.meta.url),
);
const stylesheet = readFileSync(stylesheetPath, "utf8");
const layoutPath = fileURLToPath(new URL("../app/layout.tsx", import.meta.url));
const layout = readFileSync(layoutPath, "utf8");
const packagePath = fileURLToPath(new URL("../package.json", import.meta.url));
const packageManifest = JSON.parse(readFileSync(packagePath, "utf8")) as {
  dependencies: Record<string, string>;
};

function cssVariable(name: string) {
  const match = new RegExp(`--${name}:\\s*([^;]+);`, "u").exec(stylesheet);
  if (!match?.[1]) {
    throw new Error(`Missing CSS variable --${name}.`);
  }
  return match[1].trim();
}

function relativeLuminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/gu)
    ?.map((channel) => Number.parseInt(channel, 16) / 255);

  if (!channels || channels.length !== 3) {
    throw new Error(
      `Expected a six-digit hexadecimal color, received "${hex}".`,
    );
  }

  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );

  return 0.2126 * red! + 0.7152 * green! + 0.0722 * blue!;
}

function contrastRatio(first: string, second: string) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

describe("design tokens", () => {
  it("keeps footer separators decorative and outside the document text", () => {
    expect(stylesheet).toContain('content: "|" / "";');
    expect(stylesheet).toMatch(
      /\.footer-navigation-list\s*\{[\s\S]*?flex-wrap:\s*wrap;[\s\S]*?justify-content:\s*center;/u,
    );
  });

  it("uses the approved local editorial font families", () => {
    expect(cssVariable("font-display")).toContain("Lora Variable");
    expect(cssVariable("font-body")).toContain("IBM Plex Sans Variable");
    expect(cssVariable("font-mono")).toContain("JetBrains Mono Variable");
    expect(stylesheet).not.toMatch(/\b(?:Sora|Inter) Variable\b/u);
    expect(stylesheet).toMatch(
      /\.type-hero,[\s\S]*?\.type-h4\s*\{[\s\S]*?font-family:\s*var\(--font-display\)/u,
    );
    expect(stylesheet).toMatch(
      /\.brand-wordmark\s*\{[\s\S]*?font-family:\s*var\(--font-body\)/u,
    );
    expect(stylesheet).toMatch(
      /\.type-code\s*\{[\s\S]*?font-family:\s*var\(--font-mono\)/u,
    );
  });

  it("loads only self-hosted Fontsource packages", () => {
    expect(layout).toContain('import "@fontsource-variable/lora"');
    expect(layout).toContain('import "@fontsource-variable/ibm-plex-sans"');
    expect(layout).toContain('import "@fontsource-variable/jetbrains-mono"');
    expect(layout).not.toMatch(/@fontsource-variable\/(?:sora|inter)/u);
    expect(layout).not.toMatch(/https?:\/\//u);
    expect(stylesheet).not.toMatch(
      /(?:fonts\.googleapis\.com|fonts\.gstatic\.com|https?:\/\/)/u,
    );
    expect(packageManifest.dependencies).toMatchObject({
      "@fontsource-variable/ibm-plex-sans": "5.3.0",
      "@fontsource-variable/jetbrains-mono": "5.3.0",
      "@fontsource-variable/lora": "5.3.0",
    });
    expect(packageManifest.dependencies).not.toHaveProperty(
      "@fontsource-variable/inter",
    );
    expect(packageManifest.dependencies).not.toHaveProperty(
      "@fontsource-variable/sora",
    );
  });

  it.each([
    "background",
    "surface",
    "surface-raised",
    "border",
    "foreground",
    "foreground-secondary",
    "foreground-muted",
    "accent",
    "accent-hover",
    "accent-muted",
    "success",
    "warning",
    "danger",
  ])("defines the semantic color token %s", (token) => {
    expect(cssVariable(`color-${token}`)).toMatch(/^#[\da-f]{6}$/u);
  });

  it.each([
    "hero",
    "display",
    "h1",
    "h2",
    "h3",
    "h4",
    "lead",
    "body-lg",
    "body",
    "small",
    "caption",
    "code",
  ])("defines the typography size token %s", (token) => {
    expect(cssVariable(`text-${token}`)).toBeTruthy();
  });

  it.each([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "8",
    "10",
    "12",
    "16",
    "20",
    "24",
    "32",
  ])("defines spacing token %s", (token) => {
    expect(cssVariable(`space-${token}`)).toMatch(/rem$/u);
  });

  it.each(["sm", "md", "lg", "full"])("defines radius token %s", (token) => {
    expect(cssVariable(`radius-${token}`)).toBeTruthy();
  });

  it.each(["sm", "md"])("defines shadow token %s", (token) => {
    expect(cssVariable(`shadow-${token}`)).toBeTruthy();
  });
});

describe("dark-theme contrast", () => {
  it.each([
    ["foreground", "background", 4.5],
    ["foreground-secondary", "background", 4.5],
    ["foreground-muted", "background", 4.5],
    ["accent", "background", 4.5],
    ["foreground", "surface", 4.5],
    ["foreground-secondary", "surface-raised", 4.5],
    ["background", "accent", 4.5],
  ] as const)(
    "%s against %s meets WCAG AA",
    (foreground, background, minimum) => {
      expect(
        contrastRatio(
          cssVariable(`color-${foreground}`),
          cssVariable(`color-${background}`),
        ),
      ).toBeGreaterThanOrEqual(minimum);
    },
  );
});
