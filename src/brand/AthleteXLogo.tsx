import type { SVGProps } from "react";

type Variant = "horizontal" | "stacked" | "mark";

interface LogoProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  variant?: Variant;
  showEndorsement?: boolean;
  accentColor?: string;
}

/**
 * AthleteX — proposal wordmark + mark.
 * `accentColor` themes the "X" stroke (defaults to signal red token).
 */
export function AthleteXLogo({
  variant = "horizontal",
  showEndorsement = false,
  accentColor = "var(--brand-signal)",
  ...props
}: LogoProps) {
  if (variant === "mark") return <XMark accentColor={accentColor} {...props} />;
  if (variant === "stacked")
    return <Stacked accentColor={accentColor} showEndorsement={showEndorsement} {...props} />;
  return <Horizontal accentColor={accentColor} showEndorsement={showEndorsement} {...props} />;
}

function XMark({ accentColor, ...props }: SVGProps<SVGSVGElement> & { accentColor: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* Angular X built from two forward-motion strokes */}
      <path
        d="M14 16 L58 84"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="square"
      />
      <path
        d="M86 16 L26 84"
        stroke={accentColor}
        strokeWidth="14"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Horizontal({
  accentColor,
  showEndorsement,
  ...props
}: SVGProps<SVGSVGElement> & { accentColor: string; showEndorsement?: boolean }) {
  return (
    <svg
      viewBox={showEndorsement ? "0 0 420 96" : "0 0 420 72"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="0"
        y="52"
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="54"
        letterSpacing="-2.5"
        fill="currentColor"
      >
        ATHLETE
      </text>
      <text
        x="248"
        y="52"
        fontFamily="Inter, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="60"
        letterSpacing="-3"
        fill={accentColor}
      >
        X
      </text>
      {/* Speed rule under the X */}
      <line x1="248" y1="60" x2="308" y2="60" stroke={accentColor} strokeWidth="3" />
      {showEndorsement && (
        <text
          x="2"
          y="86"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          fontSize="9"
          letterSpacing="4"
          fill="currentColor"
          opacity="0.7"
        >
          BY MORGAN OXFORD EDUCATION
        </text>
      )}
    </svg>
  );
}

function Stacked({
  accentColor,
  showEndorsement,
  ...props
}: SVGProps<SVGSVGElement> & { accentColor: string; showEndorsement?: boolean }) {
  return (
    <svg
      viewBox={showEndorsement ? "0 0 320 220" : "0 0 320 190"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g transform="translate(110,0)">
        <path d="M14 16 L58 84" stroke="currentColor" strokeWidth="14" strokeLinecap="square" />
        <path d="M86 16 L26 84" stroke={accentColor} strokeWidth="14" strokeLinecap="square" />
      </g>
      <text
        x="160"
        y="150"
        textAnchor="middle"
        fontFamily="Inter, sans-serif"
        fontWeight="800"
        fontSize="42"
        letterSpacing="-2"
        fill="currentColor"
      >
        ATHLETE<tspan fill={accentColor} fontStyle="italic" fontWeight="900">X</tspan>
      </text>
      <line x1="70" y1="168" x2="250" y2="168" stroke={accentColor} strokeWidth="2" />
      {showEndorsement && (
        <text
          x="160"
          y="196"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          fontSize="10"
          letterSpacing="5"
          fill="currentColor"
          opacity="0.7"
        >
          BY MORGAN OXFORD EDUCATION
        </text>
      )}
    </svg>
  );
}
