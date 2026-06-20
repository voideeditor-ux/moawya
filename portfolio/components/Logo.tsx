interface Props {
  size?: "sm" | "md";
}

export default function Logo({ size = "md" }: Props) {
  const scale = size === "sm" ? 0.8 : 1;
  const w = 148 * scale;
  const h = 36 * scale;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 148 36"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Moawya"
      role="img"
    >
      {/* Film-frame square */}
      <rect x="0.75" y="0.75" width="34.5" height="34.5" fill="none" stroke="#c9a84c" strokeWidth="1.5"/>

      {/* Perforation notches */}
      <rect x="0" y="8"  width="0.75" height="6" fill="#c9a84c" opacity="0.5"/>
      <rect x="0" y="22" width="0.75" height="6" fill="#c9a84c" opacity="0.5"/>
      <rect x="35.25" y="8"  width="0.75" height="6" fill="#c9a84c" opacity="0.5"/>
      <rect x="35.25" y="22" width="0.75" height="6" fill="#c9a84c" opacity="0.5"/>

      {/* M inside frame */}
      <text
        x="18"
        y="26"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontSize="22"
        fontWeight="400"
        fill="#c9a84c"
        textAnchor="middle"
      >
        M
      </text>

      {/* OAWYA wordmark */}
      <text
        x="48"
        y="24"
        fontFamily="var(--font-playfair), Georgia, serif"
        fontSize="16"
        fontWeight="400"
        fill="#f0f0f0"
        letterSpacing="3"
      >
        OAWYA
      </text>
    </svg>
  );
}
