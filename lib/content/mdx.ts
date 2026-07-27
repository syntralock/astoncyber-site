import { compile, evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { parse } from "yaml";
import type { ZodType } from "zod";

import { researchMetadataSchema, type ResearchMetadata } from "./schema.ts";

export const mdxComponentAllowlist = {
  Callout: new Set(["title"]),
} as const;

type AstNode = {
  attributes?: AstNode[];
  children?: AstNode[];
  name?: string | null;
  type?: string;
  value?: AstNode | string | null;
};

const forbiddenMdxNodeTypes = new Set([
  "html",
  "mdxFlowExpression",
  "mdxJsxAttributeValueExpression",
  "mdxJsxExpressionAttribute",
  "mdxTextExpression",
  "mdxjsEsm",
]);

function validateMdxElements() {
  return (tree: AstNode) => {
    const visit = (node: AstNode) => {
      if (node.type && forbiddenMdxNodeTypes.has(node.type)) {
        throw new Error(`MDX syntax "${node.type}" is not allowed.`);
      }

      if (
        node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement"
      ) {
        const componentName = node.name ?? "";
        const allowedAttributes =
          mdxComponentAllowlist[
            componentName as keyof typeof mdxComponentAllowlist
          ];

        if (!allowedAttributes) {
          throw new Error(
            `MDX element "${componentName || "fragment"}" is not allowed.`,
          );
        }

        for (const attribute of node.attributes ?? []) {
          if (
            attribute.type !== "mdxJsxAttribute" ||
            !attribute.name ||
            !allowedAttributes.has(attribute.name) ||
            typeof attribute.value !== "string"
          ) {
            throw new Error(
              `MDX attribute on "${componentName}" must be an allowlisted static quoted string.`,
            );
          }
        }
      }

      node.attributes?.forEach(visit);
      node.children?.forEach(visit);
      if (typeof node.value === "object" && node.value !== null) {
        visit(node.value);
      }
    };

    visit(tree);
  };
}

export function parseMdxSource<T>(
  source: string,
  schema: ZodType<T>,
): {
  body: string;
  metadata: T;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/u.exec(source);
  if (!match?.[1] || match[2] === undefined) {
    throw new Error("MDX content must begin with YAML front matter.");
  }

  return {
    body: match[2],
    metadata: schema.parse(parse(match[1])),
  };
}

export function parseResearchSource(source: string): {
  body: string;
  metadata: ResearchMetadata;
} {
  return parseMdxSource(source, researchMetadataSchema);
}

export async function compileSafeMdxBody(body: string) {
  const compiled = await compile(body, {
    outputFormat: "function-body",
    remarkPlugins: [validateMdxElements],
  });

  return String(compiled);
}

export async function compileSafeMdx(source: string) {
  const { body, metadata } = parseResearchSource(source);
  return { code: await compileSafeMdxBody(body), metadata };
}

export async function evaluateSafeMdx(source: string) {
  const { body, metadata } = parseResearchSource(source);
  const evaluated = await evaluateSafeMdxBody(body);

  return {
    ...evaluated,
    metadata,
  };
}

export async function evaluateSafeMdxBody(body: string) {
  const evaluated = await evaluate(body, {
    ...runtime,
    baseUrl: import.meta.url,
    remarkPlugins: [validateMdxElements],
  });

  return {
    Content: evaluated.default,
  };
}
