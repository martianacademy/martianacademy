import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const COLORS = {
  bg: '#f7f7fb',
  ink: '#111827',
  muted: '#667085',
  pink: '#f72585',
  blue: '#2563eb',
  card: '#ffffff',
  border: '#e5e7eb',
};

const Node: React.FC<{
  label: string;
  sub: string;
  accent: string;
  progress: number;
}> = ({label, sub, accent, progress}) => {
  const scale = interpolate(progress, [0, 1], [0.82, 1]);
  const y = interpolate(progress, [0, 1], [36, 0]);

  return (
    <div
      style={{
        width: 420,
        height: 220,
        borderRadius: 34,
        background: COLORS.card,
        border: `2px solid ${COLORS.border}`,
        boxShadow: '0 24px 70px rgba(17,24,39,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        transform: `translateY(${y}px) scale(${scale})`,
        opacity: progress,
      }}
    >
      <div
        style={{
          width: 76,
          height: 76,
          borderRadius: 22,
          background: accent,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 900,
          fontSize: 34,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {label.slice(0, 1)}
      </div>
      <div
        style={{
          fontSize: 44,
          fontWeight: 800,
          color: COLORS.ink,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 24,
          color: COLORS.muted,
          fontFamily: 'Arial, sans-serif',
        }}
      >
        {sub}
      </div>
    </div>
  );
};

const Arrow: React.FC<{progress: number}> = ({progress}) => (
  <div
    style={{
      width: 150,
      height: 8,
      borderRadius: 999,
      background: COLORS.ink,
      position: 'relative',
      transform: `scaleX(${progress})`,
      transformOrigin: 'left center',
      opacity: progress,
    }}
  >
    <div
      style={{
        position: 'absolute',
        right: -4,
        top: -11,
        width: 28,
        height: 28,
        borderTop: `8px solid ${COLORS.ink}`,
        borderRight: `8px solid ${COLORS.ink}`,
        transform: 'rotate(45deg)',
      }}
    />
  </div>
);

export const Demo: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const titleIn = spring({fps, frame, config: {damping: 14}});
  const aiIn = spring({fps, frame: Math.max(0, frame - 22), config: {damping: 13}});
  const arrow1 = spring({fps, frame: Math.max(0, frame - 42), config: {damping: 16}});
  const mcpIn = spring({fps, frame: Math.max(0, frame - 58), config: {damping: 13}});
  const arrow2 = spring({fps, frame: Math.max(0, frame - 82), config: {damping: 16}});
  const dataIn = spring({fps, frame: Math.max(0, frame - 98), config: {damping: 13}});
  const footerIn = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glow = interpolate(frame, [95, 125, 155, 179], [0.1, 0.35, 0.16, 0.28]);

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bg,
        color: COLORS.ink,
        fontFamily: 'Arial, sans-serif',
        padding: '76px 90px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [-26, 0])}px)`,
        }}
      >
        <div>
          <div
            style={{
              color: COLORS.pink,
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: 5,
              marginBottom: 14,
            }}
          >
            MARTIAN ACADEMY
          </div>
          <div style={{fontSize: 72, fontWeight: 900, letterSpacing: -3}}>
            Connect AI to the real world
          </div>
        </div>

        <div
          style={{
            padding: '16px 26px',
            borderRadius: 999,
            background: '#111827',
            color: 'white',
            fontSize: 25,
            fontWeight: 800,
          }}
        >
          REMOTION DEMO
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 46,
          filter: `drop-shadow(0 0 ${80 * glow}px rgba(37,99,235,${glow}))`,
        }}
      >
        <Node
          label="AI"
          sub="Understands your request"
          accent={COLORS.blue}
          progress={aiIn}
        />
        <Arrow progress={arrow1} />
        <Node
          label="MCP"
          sub="Standard tool connection"
          accent={COLORS.pink}
          progress={mcpIn}
        />
        <Arrow progress={arrow2} />
        <Node
          label="Live Data"
          sub="Weather • APIs • Tools"
          accent="#0ea5e9"
          progress={dataIn}
        />
      </div>

      <div
        style={{
          opacity: footerIn,
          transform: `translateY(${interpolate(footerIn, [0, 1], [26, 0])}px)`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `2px solid ${COLORS.border}`,
          paddingTop: 28,
        }}
      >
        <div style={{fontSize: 30, fontWeight: 800}}>
          AI → MCP → Real-world capability
        </div>
        <div style={{fontSize: 25, color: COLORS.muted}}>
          Simple GitHub Actions render test
        </div>
      </div>
    </AbsoluteFill>
  );
};
