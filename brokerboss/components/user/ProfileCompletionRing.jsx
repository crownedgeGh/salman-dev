'use client';

/**
 * ProfileCompletionRing
 * Circular SVG progress ring that visualises profile completion percentage.
 * Props:
 *   percentage: number  0–100
 */
export default function ProfileCompletionRing({ percentage = 0 }) {
  const radius = 40;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const clampedPct = Math.max(0, Math.min(100, Math.round(percentage)));
  const strokeDashoffset = circumference - (clampedPct / 100) * circumference;

  // Color based on completion level
  const strokeColor =
    clampedPct >= 80
      ? '#22c55e'   // green
      : clampedPct >= 40
      ? '#f59e0b'   // amber
      : '#ef4444';  // red

  return (
    <div className="flex flex-col items-center gap-1.5" aria-label={`Profile ${clampedPct}% complete`}>
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background track */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Progress arc */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
        {/* Centered text — rendered in SVG so rotation doesn't affect it */}
        <text
          x={radius}
          y={radius + 1}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            transform: 'rotate(90deg)',
            transformOrigin: `${radius}px ${radius}px`,
            fontSize: '14px',
            fontWeight: 700,
            fill: strokeColor,
          }}
        >
          {clampedPct}%
        </text>
      </svg>
      <p className="text-xs font-medium text-muted-foreground">Profile Complete</p>
    </div>
  );
}
