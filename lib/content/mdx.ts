import { compile } from "@mdx-js/mdx";
import { parse } from "yaml";

import { researchMetadataSchema, type ResearchMetadata } from "./schema.ts";

export const mdxComponentAllowlist = ["Callout"] as const;

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
  const allowedComponents = new Set<string>(mdxComponentAllowlist);

  return (tree: AstNode) => {
    const visit = (node: AstNode) => {
      if (node.type && forbiddenMdxNodeTypes.has(node.type)) {
        throw new Error(`MDX syntax "${node.type}" is not allowed.`);
      }

      if (
        node.type === "mdxJsxFlowElement" ||
        node.type === "mdxJsxTextElement"
      ) {
        const name = node.name ?? "";
        if (!allowedComponents.has(name)) {
          throw new Error(
            `MDX element "${name || "fragment"}" is not allowed.`,
          );
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

export function parseResearchSource(source: string): {
  body: string;
  metadata: ResearchMetadata;
} {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/u.exec(source);
  if (!match?.[1] || match[2] === undefined) {
    throw new Error("MDX content must begin with YAML front matter.");
  }

  return {
    body: match[2],
    metadata: researchMetadataSchema.parse(parse(match[1])),
  };
}

export async function compileSafeMdx(source: string) {
  const { body, metadata } = parseResearchSource(source);
  const compiled = await compile(body, {
    outputFormat: "function-body",
    remarkPlugins: [validateMdxElements],
  });

  return { code: String(compiled), metadata };
}
