import path from "node:path";

export const projectStatuses = [
  "active",
  "stable",
  "completed",
  "archived",
] as const;

export const labMaturities = [
  "experimental",
  "prototype",
  "beta",
  "stable",
  "archived",
] as const;

export const projectStatusPresentation = {
  active: {
    description: "Work remains active; maintenance is not implied.",
    label: "Active",
  },
  stable: {
    description: "The documented Project is in a stable state.",
    label: "Stable",
  },
  completed: {
    description:
      "The documented scope is complete; maintenance is not implied.",
    label: "Completed",
  },
  archived: {
    description: "The Project is retained as an archival record.",
    label: "Archived",
  },
} as const;

export const labMaturityPresentation = {
  experimental: {
    description: "Experimental work; not presented as production-ready.",
    label: "Experimental",
  },
  prototype: {
    description: "Prototype work; not presented as production-ready.",
    label: "Prototype",
  },
  beta: {
    description: "Beta work that may change and is not presented as final.",
    label: "Beta",
  },
  stable: {
    description: "The documented Lab is in a stable state.",
    label: "Stable",
  },
  archived: {
    description: "The Lab is retained as an archival record.",
    label: "Archived",
  },
} as const;

export const publicationVisibilities = ["public", "draft"] as const;

export const licenseRegistry = {
  MIT: { name: "MIT", openSource: true },
  "Apache-2.0": { name: "Apache License 2.0", openSource: true },
  "BSD-2-Clause": { name: "BSD 2-Clause", openSource: true },
  "BSD-3-Clause": { name: "BSD 3-Clause", openSource: true },
  "GPL-3.0-only": { name: "GNU GPL 3.0 only", openSource: true },
  "MPL-2.0": { name: "Mozilla Public License 2.0", openSource: true },
  "CC-BY-4.0": { name: "Creative Commons Attribution 4.0", openSource: true },
  "CC-BY-SA-4.0": {
    name: "Creative Commons Attribution-ShareAlike 4.0",
    openSource: true,
  },
  "CC0-1.0": { name: "CC0 1.0", openSource: true },
  proprietary: { name: "Proprietary", openSource: false },
  unlicensed: { name: "Unlicensed", openSource: false },
} as const;

export type LicenseIdentifier = keyof typeof licenseRegistry;

export function isOpenSourceLicense(license: LicenseIdentifier) {
  return licenseRegistry[license].openSource;
}

export const resourceMediaTypes = {
  ".csv": "text/csv",
  ".gif": "image/gif",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".md": "text/markdown",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".txt": "text/plain",
  ".webp": "image/webp",
  ".xml": "application/xml",
  ".yaml": "application/yaml",
  ".yml": "application/yaml",
} as const;

export function validateRepositoryUrl(value: string) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  return (
    url.protocol === "https:" &&
    !url.username &&
    !url.password &&
    !url.port &&
    (url.hostname === "github.com" || url.hostname === "gitlab.com")
  );
}

export function validateExternalHttpsUrl(value: string) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  return (
    url.protocol === "https:" && !url.username && !url.password && !url.port
  );
}

export function validateResourceDeclaration(
  resourcePath: string,
  mediaType: string,
) {
  const extension = path.posix.extname(resourcePath);
  const normalizedExtension = extension.toLowerCase();
  const approvedMediaType =
    resourceMediaTypes[normalizedExtension as keyof typeof resourceMediaTypes];

  return (
    extension === normalizedExtension &&
    approvedMediaType !== undefined &&
    approvedMediaType === mediaType
  );
}
