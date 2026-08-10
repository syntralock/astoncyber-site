export type Offering = Readonly<{
  boundaries: readonly string[];
  description: string;
  introduction: string;
  outcomes: readonly string[];
  slug: string;
  title: string;
  usefulWhen: readonly string[];
  whatItIs: readonly string[];
  workingTogether: readonly string[];
}>;

export const offerings = [
  {
    boundaries: [
      "This work is not a regulatory audit, attestation, certification, or legal opinion.",
      "Direction and roadmaps remain grounded in the evidence available, the organization's operating reality, and the decisions within scope.",
    ],
    description:
      "Understand your environment, identify what matters, and establish a practical security direction aligned with your goals and operational reality.",
    introduction:
      "Build a shared understanding of the organization, its systems, and its priorities before deciding what security work should come next.",
    outcomes: [
      "A current-state view of relevant systems, responsibilities, dependencies, and control gaps",
      "Clear priorities and architecture principles for consequential decisions",
      "A practical roadmap that connects security direction to implementation and ownership",
    ],
    slug: "security-strategy-architecture",
    title: "Security Strategy & Architecture",
    usefulWhen: [
      "The problem is important but not yet clearly framed",
      "Security work has accumulated without a coherent direction",
      "A platform, operating-model, or technology change requires architectural decisions",
      "Leadership needs a practical roadmap rather than a generic maturity target",
    ],
    whatItIs: [
      "This offering combines discovery, organizational and systems mapping, current-state understanding, control evaluation, architecture, and roadmap development.",
      "The work begins with the questions the organization can answer today. Aston Cyber can help uncover and frame the problem before recommending a direction.",
    ],
    workingTogether: [
      "Work may involve conversations with responsible owners, review of available evidence, mapping systems and decision boundaries, evaluating viable options, and establishing a direction that the organization can operate over time.",
      "Discovery, architecture, and roadmap development may stand alone or provide the foundation for later engineering and improvement work.",
    ],
  },
  {
    boundaries: [
      "Aston Cyber does not promise comprehensive transformation across every technology or vendor.",
      "Implementation scope, production access, operational ownership, and validation responsibilities are defined for the work being considered.",
    ],
    description:
      "Design and implement security capabilities that fit the way your organization actually operates.",
    introduction:
      "Turn an agreed security direction into practical controls, integrations, automation, and operating capability.",
    outcomes: [
      "A security capability designed around the organization's systems and responsibilities",
      "Implemented or improved controls, configurations, integrations, or automation",
      "Validation evidence, operating guidance, and a clear handoff to responsible teams",
    ],
    slug: "security-engineering",
    title: "Security Engineering",
    usefulWhen: [
      "A sound direction exists but implementation needs focused engineering support",
      "Identity, cloud, platform, or control components do not work together reliably",
      "Manual security work should become more repeatable and supportable",
      "A design needs to be tested against operational reality before broader adoption",
    ],
    whatItIs: [
      "Security engineering connects architecture to implementation. It may involve identity, cloud platforms, Microsoft technologies, technical controls, automation, and integrations without treating any particular product as the answer by default.",
      "The goal is a capability that can be understood, operated, validated, and improved—not simply a collection of settings or tools.",
    ],
    workingTogether: [
      "Depending on the problem, the work may include refining requirements, designing the capability, building or configuring selected elements, integrating with existing systems, validating behavior, documenting decisions, and preparing operational ownership.",
      "Implementation can follow earlier strategy work or begin with focused discovery when the technical problem still needs definition.",
    ],
  },
  {
    boundaries: [
      "These reviews are not penetration tests, regulatory audits, attestations, certifications, or legal opinions.",
      "Findings describe the evidence and scope examined; they do not guarantee the absence of other weaknesses or future incidents.",
    ],
    description:
      "Gain clarity on what's working, what isn't, and where to focus next.",
    introduction:
      "Examine a defined security area closely enough to support a sound decision, practical improvement, or confident next step.",
    outcomes: [
      "A clear account of what was reviewed, what evidence supports the findings, and where uncertainty remains",
      "Prioritized improvement opportunities tied to operational and technical context",
      "Decision-ready recommendations rather than a report produced for its own sake",
    ],
    slug: "security-reviews-assessments",
    title: "Security Reviews & Assessments",
    usefulWhen: [
      "Leadership needs an independent view of a specific control area or architecture",
      "A team wants to validate whether a capability works as intended",
      "Competing concerns make it difficult to decide what should be corrected first",
      "A planned change would benefit from focused design or readiness review",
    ],
    whatItIs: [
      "A focused review uses available evidence to understand the condition of a system, control area, workflow, or design and to identify the decisions that follow.",
      "The emphasis is useful understanding: what appears sound, what needs attention, what cannot yet be concluded, and where effort is likely to matter most.",
    ],
    workingTogether: [
      "Aston Cyber and the client establish the review question, relevant systems, evidence sources, and decision context. The work may include document and configuration review, stakeholder conversations, control tracing, and validation of selected behavior.",
      "Findings are communicated with their limitations and can lead into architecture, engineering, or continued improvement when that is useful.",
    ],
  },
  {
    boundaries: [
      "Aston Cyber does not provide 24/7 monitoring, emergency incident response, or guaranteed immediate replacement coverage at launch.",
      "Any recurring support, service expectations, access, responsibilities, and response arrangements must be defined for the relationship under consideration.",
    ],
    description:
      "Validate, refine, and evolve security capabilities as your organization, technology, and risks change.",
    introduction:
      "Help security capabilities remain understandable, reliable, and useful after their initial design or implementation.",
    outcomes: [
      "Validated controls and operating practices with clearer ownership",
      "Prioritized refinements based on change, evidence, and observed performance",
      "Improved documentation, maintenance practices, internal-team handoff, or an agreed path for continued support",
    ],
    slug: "security-operations-improvement",
    title: "Security Operations & Improvement",
    usefulWhen: [
      "Controls or processes have drifted as systems and responsibilities changed",
      "A new capability needs to be operationalized and transferred to its owners",
      "Periodic review would help keep a critical area aligned with current needs",
      "An internal team needs focused support maintaining or improving a defined capability",
    ],
    whatItIs: [
      "Security capabilities need attention after launch. This offering supports validation, maintenance, operationalization, periodic review, and continued improvement as the organization changes.",
      "The relationship may be a defined improvement effort or continued support around an agreed area. The public overview does not prescribe one staffing or engagement model.",
    ],
    workingTogether: [
      "Work may include reviewing how a capability is performing, validating controls, refining automation and procedures, clarifying ownership, improving evidence, supporting internal teams, and identifying the next useful change.",
      "The cadence and depth depend on the capability, the organization's operating model, and the outcomes being pursued.",
    ],
  },
  {
    boundaries: [
      "A prototype or research finding is not automatically a production-ready system or evidence of a guaranteed outcome.",
      "Commercial work remains separate from public research, and client information is not published without authorization and appropriate anonymization.",
    ],
    description:
      "Explore complex problems, test ideas, and develop new approaches where the answer is not yet clear.",
    introduction:
      "Investigate consequential questions before an organization commits to a design, implementation path, or larger investment.",
    outcomes: [
      "A clearer research question, assumptions, and decision context",
      "A prototype, design artifact, experiment, or evidence set suited to the question",
      "Findings, limitations, and a reasoned recommendation to proceed, change direction, or stop",
    ],
    slug: "research-innovation",
    title: "Research & Innovation",
    usefulWhen: [
      "An important security problem does not yet have a reliable answer",
      "A concept should be tested before production investment",
      "Existing approaches do not fit the organization's workflow or constraints",
      "A decision would benefit from structured investigation and a working artifact",
    ],
    whatItIs: [
      "Research and innovation work frames a question, examines evidence, tests ideas, and develops practical artifacts where established answers are incomplete or unsuitable.",
      "It uses the same evidence-led approach visible in Aston Cyber's public research while keeping commercial objectives and public editorial decisions separate.",
    ],
    workingTogether: [
      "The work may involve mapping the problem, reviewing existing approaches, developing a prototype or control concept, testing defined properties, recording limitations, and evaluating what would be required for operational use.",
      "Not every investigation should become a production project. A well-supported decision not to proceed can be a useful outcome.",
    ],
  },
] as const satisfies readonly Offering[];

export const offeringSlugs = offerings.map(({ slug }) => slug);

export function getOffering(slug: string) {
  return offerings.find((offering) => offering.slug === slug);
}
