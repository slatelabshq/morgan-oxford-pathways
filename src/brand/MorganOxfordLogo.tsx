import type { SVGProps } from "react";

type Variant = "horizontal" | "stacked" | "mark" | "crest";

interface LogoProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  variant?: Variant;
  showTagline?: boolean;
}

/**
 * Morgan Oxford Education — primary logo suite.
 * Colors driven by currentColor + a `data-accent` stroke that inherits
 * from the parent's text color. Wrap in a colored element to theme.
 */
export function MorganOxfordLogo({
  variant = "horizontal",
  showTagline = false,
  ...props
}: LogoProps) {
  if (variant === "mark") return <Monogram {...props} />;
  if (variant === "crest") return <Crest {...props} />;
  if (variant === "stacked") return <Stacked showTagline={showTagline} {...props} />;
  return <Horizontal showTagline={showTagline} {...props} />;
}

function Monogram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="60" cy="60" r="58" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      {/* Interlocking serif M O */}
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontWeight="500"
        fontSize="52"
        fill="currentColor"
        letterSpacing="-2"
      >
        MO
      </text>
      <line x1="30" y1="92" x2="90" y2="92" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
    </svg>
  );
}

function Crest(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 140 160" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Simple shield */}
      <path
        d="M70 6 L128 22 L128 78 C128 118 100 142 70 154 C40 142 12 118 12 78 L12 22 Z"
        stroke="currentColor"
        strokeWidth="1.25"
        fill="none"
      />
      <path
        d="M70 14 L120 28 L120 78 C120 112 96 134 70 145 C44 134 20 112 20 78 L20 28 Z"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
        fill="none"
      />
      <line x1="30" y1="60" x2="110" y2="60" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <line x1="34" y1="100" x2="106" y2="100" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <text
        x="70"
        y="90"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontWeight="500"
        fontSize="36"
        fill="currentColor"
        letterSpacing="-1"
      >
        MO
      </text>
      <text
        x="70"
        y="122"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="600"
        fontSize="6"
        letterSpacing="3"
        fill="currentColor"
      >
        EST · OXFORD
      </text>
    </svg>
  );
}

function Horizontal({
  showTagline,
  ...props
}: SVGProps<SVGSVGElement> & { showTagline?: boolean }) {
  return (
    <svg
      viewBox={showTagline ? "0 0 440 90" : "0 0 420 72"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(4,4)">
        <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="1.25" />
        <text
          x="32"
          y="42"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontWeight="500"
          fontSize="28"
          fill="currentColor"
          letterSpacing="-1.5"
        >
          MO
        </text>
      </g>
      <line x1="76" y1="10" x2="76" y2="58" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <text
        x="90"
        y="34"
        fontFamily="Fraunces, serif"
        fontWeight="500"
        fontSize="22"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        Morgan Oxford
      </text>
      <text
        x="90"
        y="54"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        fontSize="9"
        letterSpacing="4"
        fill="currentColor"
        opacity="0.75"
      >
        EDUCATION
      </text>
      {showTagline && (
        <text
          x="90"
          y="80"
          fontFamily="Fraunces, serif"
          fontStyle="italic"
          fontWeight="400"
          fontSize="11"
          fill="currentColor"
          opacity="0.7"
        >
          Guiding Young Minds to World-Class Schools
        </text>
      )}
    </svg>
  );
}

function Stacked({
  showTagline,
  ...props
}: SVGProps<SVGSVGElement> & { showTagline?: boolean }) {
  return (
    <svg
      viewBox={showTagline ? "0 0 320 220" : "0 0 320 190"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(120,4)">
        <circle cx="40" cy="40" r="39" stroke="currentColor" strokeWidth="1.25" />
        <text
          x="40"
          y="53"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontWeight="500"
          fontSize="38"
          fill="currentColor"
          letterSpacing="-2"
        >
          MO
        </text>
      </g>
      <line x1="60" y1="102" x2="260" y2="102" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
      <text
        x="160"
        y="138"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontWeight="500"
        fontSize="26"
        fill="currentColor"
        letterSpacing="-0.5"
      >
        Morgan Oxford
      </text>
      <text
        x="160"
        y="164"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="500"
        fontSize="10"
        letterSpacing="6"
        fill="currentColor"
        opacity="0.75"
      >
        EDUCATION
      </text>
      {showTagline && (
        <text
          x="160"
          y="200"
          textAnchor="middle"
          fontFamily="Fraunces, serif"
          fontStyle="italic"
          fontWeight="400"
          fontSize="12"
          fill="currentColor"
          opacity="0.7"
        >
          Guiding Young Minds to World-Class Schools
        </text>
      )}
    </svg>
  );
}
