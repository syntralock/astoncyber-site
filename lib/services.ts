export type Service = Readonly<{
  activities: readonly string[];
  boundaries: readonly string[];
  description: string;
  introduction: string;
  outcomes: readonly string[];
  slug: string;
  title: string;
  usefulWhen: readonly string[];
  whatItCovers: readonly string[];
}>;

export const services = [
  {
    activities: [
      "Business and technology discovery",
      "System, dependency, and data-flow mapping",
      "Architecture and modernization planning",
      "Application and data integration",
      "Cloud, infrastructure, and system migration",
      "Bounded custom software development",
      "Implementation, validation, documentation, and handoff",
    ],
    boundaries: [
      "Scope depends on the technologies, access, data, operational risk, and specialist expertise involved.",
      "Aston Cyber does not claim universal migration capability, unlimited product expertise, large-program staffing, or comprehensive managed IT ownership.",
    ],
    description:
      "Improve the systems, applications, infrastructure, and data flows that support business operations.",
    introduction:
      "Modernize fragmented, inefficient, aging, or poorly configured systems around the way the business needs to operate.",
    outcomes: [
      "A current-state system and dependency map",
      "Modernization priorities, architecture, or a practical roadmap",
      "An improved configuration, integration, or migration",
      "A focused custom application or internal tool",
      "Validation results and operational documentation",
    ],
    slug: "systems-modernization",
    title: "Systems Modernization",
    usefulWhen: [
      "Important information is split across applications",
      "Employees repeat the same data entry in multiple places",
      "A system is difficult to maintain or poorly understood",
      "A migration is needed but ownership and dependencies are unclear",
      "Current tools are capable but do not work together effectively",
      "A focused custom application would address a gap that configuration cannot",
    ],
    whatItCovers: [
      "Systems modernization is not limited to replacing old technology. It can mean connecting current tools, correcting fragile configurations, simplifying a difficult process, improving infrastructure, or building a focused capability that existing systems do not provide.",
      "Work can begin with an assessment or existing plan and may continue through architecture, implementation, migration, validation, documentation, and handoff.",
    ],
  },
  {
    activities: [
      "Process and workflow assessment",
      "Application and API connectivity",
      "Workflow and reporting automation",
      "Document and information processing",
      "Applied AI integration and application development",
      "Human review and exception-path design",
      "Testing, monitoring, and operational documentation",
    ],
    boundaries: [
      "Automation does not guarantee staffing reductions, financial savings, accuracy, or suitability for every process.",
      "AI outputs may require human review, testing, data controls, and continued evaluation. Aston Cyber does not offer a general-purpose AI product or unmanaged autonomous decision system.",
    ],
    description:
      "Reduce avoidable manual work by improving workflows, connecting systems, and applying automation or AI where it provides a clear benefit.",
    introduction:
      "Begin with the process, then use integration, automation, or applied AI when it is appropriate to the information, risk, and desired outcome.",
    outcomes: [
      "A process and automation opportunity assessment",
      "A clearer future-state workflow",
      "An application integration or automated reporting flow",
      "A human-reviewed AI workflow",
      "A bounded prototype or production implementation",
      "Validation evidence and operating documentation",
    ],
    slug: "automation-applied-ai",
    title: "Automation & Applied AI",
    usefulWhen: [
      "Staff repeatedly transfer information between systems",
      "Routine reports require manual collection and formatting",
      "Documents or messages must be classified, summarized, or routed",
      "An integration is unreliable or depends on fragile workarounds",
      "The organization wants to evaluate AI without committing to an unsuitable platform",
      "A process needs human approval but would benefit from automated preparation",
    ],
    whatItCovers: [
      "Automation begins with understanding the work. Sometimes the right answer is a reliable integration, a simpler workflow, or better use of tools the organization already owns.",
      "AI is considered when it provides a practical benefit and can be implemented with appropriate testing, oversight, exception handling, and ownership.",
    ],
  },
  {
    activities: [
      "Technology-risk and architecture review",
      "Identity and access design",
      "Cloud and Microsoft 365 security improvement",
      "Data-flow and data-protection review",
      "Security control implementation",
      "Configuration and control validation",
      "Ownership, maintenance, and handoff documentation",
    ],
    boundaries: [
      "This service is not a regulatory audit, attestation, legal opinion, penetration-testing program, managed SOC, MDR service, or emergency incident-response service.",
      "Findings and validation are limited to the agreed scope and evidence examined. Ongoing work requires an explicitly defined cadence, responsibility model, and response expectation.",
    ],
    description:
      "Design and improve technology with security, resilience, and risk understood from the beginning.",
    introduction:
      "Build and validate appropriately protected systems without separating security from the modernization decisions that shape them.",
    outcomes: [
      "A focused technology-risk assessment",
      "A security architecture or implementation plan",
      "Identity, cloud, or Microsoft 365 configuration improvements",
      "Implemented or improved security controls",
      "Validation evidence and ownership documentation",
    ],
    slug: "cybersecurity-technology-risk",
    title: "Cybersecurity & Technology Risk",
    usefulWhen: [
      "Access and ownership are unclear",
      "Cloud or identity configurations have grown inconsistent",
      "A modernization project needs security requirements and design review",
      "Leadership needs a focused understanding of technology risk",
      "A defined control or security capability needs implementation or validation",
      "Sensitive data moves across poorly understood systems or integrations",
    ],
    whatItCovers: [
      "Cybersecurity is both a substantive engineering service and a principle applied throughout modernization work.",
      "The objective is to make systems appropriately protected, understandable, maintainable, and aligned with the organization's actual technology risk.",
    ],
  },
] as const satisfies readonly Service[];

export const serviceSlugs = services.map(({ slug }) => slug);

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
