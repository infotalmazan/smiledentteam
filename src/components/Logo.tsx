'use client'

import { BRAND } from '@/lib/brand'

interface LogoProps {
  height?: number
  light?: boolean
  className?: string
}

export function Logo({ height = 38, light = false, className }: LogoProps) {
  const teal = light ? '#ffffff' : BRAND.p

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        height,
        flexShrink: 0,
        cursor: 'pointer',
      }}
    >
      {/* Pink bar accent */}
      <div style={{
        width: 4,
        height: '62%',
        background: BRAND.a,
        borderRadius: 2,
        marginRight: 10,
        flexShrink: 0,
      }}/>
      {/* Smile Dent Team stacked text */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        lineHeight: 1.1,
      }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: Math.round(height * 0.5),
          fontWeight: 800,
          color: teal,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          Smile Dent
        </span>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: Math.round(height * 0.5),
          fontWeight: 800,
          color: teal,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          Team
        </span>
      </div>
    </div>
  )
}
