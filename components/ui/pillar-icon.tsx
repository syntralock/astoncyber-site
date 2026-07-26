export type PillarIconName = "people" | "prism" | "search";

type PillarIconProps = Readonly<{
  name: PillarIconName;
}>;

export function PillarIcon({ name }: PillarIconProps) {
  return (
    <svg
      aria-hidden="true"
      className="pillar-icon"
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      {name === "people" ? (
        <>
          <circle cx="12" cy="7" r="2.5" />
          <circle cx="5.5" cy="9" r="2" />
          <circle cx="18.5" cy="9" r="2" />
          <path d="M7.5 19v-2.5a4.5 4.5 0 0 1 9 0V19" />
          <path d="M2.5 19v-2a3 3 0 0 1 4-2.8" />
          <path d="M21.5 19v-2a3 3 0 0 0-4-2.8" />
        </>
      ) : null}

      {name === "search" ? (
        <>
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="m15 15 5 5" />
        </>
      ) : null}

      {name === "prism" ? (
        <>
          <path d="m12 3 8 15H4L12 3Z" />
          <path d="m12 3 2.5 15" />
          <path d="m7.5 12.5 11 2" />
        </>
      ) : null}
    </svg>
  );
}
