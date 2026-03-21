import React from 'react';

export const TopArch = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className={className} style={{ filter: "drop-shadow(0 15px 25px rgba(92, 58, 33, 0.25))", ...style }}>
    {/* Inner shadow layer / Back Arch */}
    <path d="M0 0 L1000 0 L1000 170 Q850 170 800 240 Q700 70 500 30 Q300 70 200 240 Q150 170 0 170 Z" fill="#8B5A33" opacity="0.15" />
    {/* Main Arch Outline */}
    <path d="M0 0 L1000 0 L1000 150 Q850 150 800 220 Q700 50 500 20 Q300 50 200 220 Q150 150 0 150 Z" fill="#5C3A21" />
    <path d="M0 140 L1000 140 Q850 140 800 210 Q700 40 500 10 Q300 40 200 210 Q150 140 0 140 Z" fill="none" stroke="#C49A45" strokeWidth="3" opacity="0.6" />
  </svg>
);

export const BrightLantern3D = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 160 300" overflow="visible" className={className} style={{ filter: "drop-shadow(0 15px 15px rgba(92, 58, 33, 0.25))", ...style }}>
    <defs>
      <linearGradient id="lanternGoldLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eaddcc" />
        <stop offset="50%" stopColor="#C49A45" />
        <stop offset="100%" stopColor="#8B5A33" />
      </linearGradient>
      <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fffbeb" stopOpacity="0.8" />
        <stop offset="50%" stopColor="#fdf6e3" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#fffbeb" stopOpacity="0.8" />
      </linearGradient>
    </defs>
    <line x1="80" y1="-800" x2="80" y2="40" stroke="url(#lanternGoldLight)" strokeWidth="4" />
    <circle cx="80" cy="45" r="8" fill="none" stroke="url(#lanternGoldLight)" strokeWidth="3" />
    <path d="M50 80 L110 80 L95 53 L65 53 Z" fill="url(#lanternGoldLight)" />
    <path d="M40 90 L120 90 L110 80 L50 80 Z" fill="#5C3A21" />
    <path d="M45 90 L115 90 L130 190 L30 190 Z" fill="url(#glassGradient)" />
    <circle cx="80" cy="150" r="25" fill="#C49A45" filter="blur(8px)" />
    <path d="M75 160 Q 80 130 85 160 Z" fill="#A67C52" />
    <path d="M60 90 L50 190 M100 90 L110 190 M80 90 L80 190" stroke="url(#lanternGoldLight)" strokeWidth="4" fill="none" />
    <path d="M38 120 L122 120 M34 160 L126 160" stroke="url(#lanternGoldLight)" strokeWidth="2" fill="none" />
    <path d="M30 190 L130 190 L120 200 L40 200 Z" fill="#5C3A21" />
    <path d="M50 200 L110 200 L95 220 L65 220 Z" fill="url(#lanternGoldLight)" />
    <path d="M80 220 L80 260 M70 230 L60 270 M90 230 L100 270" stroke="#C49A45" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const MosqueFooter = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className={className} style={{ filter: "drop-shadow(0 -10px 15px rgba(92, 58, 33, 0.15))", ...style }}>
    <defs>
      <linearGradient id="mosqueGold" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#C49A45" />
        <stop offset="100%" stopColor="#8B5A33" />
      </linearGradient>
    </defs>
    
    <path d="M0 100 Q 250 80 500 120 T 1000 80 L1000 250 L0 250 Z" fill="#8B5A33" className="animate-wave-delayed" />
    <path d="M0 120 Q 300 150 600 100 T 1000 130 L1000 250 L0 250 Z" fill="#5C3A21" className="animate-wave" />
    
    <path d="M420 120 C 420 60, 500 20, 500 0 C 500 20, 580 60, 580 120 Z" fill="url(#mosqueGold)" />
    <rect x="440" y="120" width="120" height="80" fill="url(#mosqueGold)" />
    <rect x="250" y="80" width="10" height="120" fill="url(#mosqueGold)" />
    <polygon points="245,80 265,80 255,50" fill="url(#mosqueGold)" />
    <path d="M280 140 C 280 100, 320 80, 320 60 C 320 80, 360 100, 360 140 Z" fill="url(#mosqueGold)" />
    <rect x="290" y="140" width="60" height="60" fill="url(#mosqueGold)" />
    <rect x="750" y="60" width="12" height="140" fill="url(#mosqueGold)" />
    <polygon points="744,60 768,60 756,30" fill="url(#mosqueGold)" />
    <path d="M640 130 C 640 90, 680 70, 680 50 C 680 70, 720 90, 720 130 Z" fill="url(#mosqueGold)" />
    <rect x="650" y="130" width="60" height="70" fill="url(#mosqueGold)" />
  </svg>
);

export const Moon3DLight = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 200 200" className={className} style={{ filter: "drop-shadow(0 15px 15px rgba(196, 154, 69, 0.4))", ...style }}>
    <defs>
      <linearGradient id="moonGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDF6E3" />
        <stop offset="100%" stopColor="#C49A45" />
      </linearGradient>
    </defs>
    <path d="M100 20 A 80 80 0 1 0 180 100 A 60 60 0 1 1 100 20 Z" fill="url(#moonGradLight)" />
  </svg>
);

export const StarSparkle = ({ className, style }: { className?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 100 100" className={className} style={{ filter: "drop-shadow(0 0 8px rgba(196, 154, 69, 0.6))", ...style }}>
    <path d="M50 0 L55 40 L100 50 L55 60 L50 100 L45 60 L0 50 L45 40 Z" fill="#C49A45" />
    <circle cx="50" cy="50" r="10" fill="#ffffff" />
  </svg>
);
