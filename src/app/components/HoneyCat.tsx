import { useId } from 'react';

interface HoneyCatProps {
  size?: number;
  animated?: boolean;
  expression?: 'default' | 'happy' | 'thinking' | 'wink';
  showCup?: boolean;
  className?: string;
}

export function HoneyCat({
  size = 200,
  animated = true,
  expression = 'default',
  showCup = false,
  className = '',
}: HoneyCatProps) {
  const baseId = useId().replace(/:/g, '');
  const compact = size < 80;
  const shadowId = `honey-shadow-${baseId}`;
  const furId = `honey-fur-${baseId}`;
  const creamId = `honey-cream-${baseId}`;
  const eyeId = `honey-eye-${baseId}`;
  const scarfId = `honey-scarf-${baseId}`;
  const scarfShadeId = `honey-scarf-shade-${baseId}`;
  const scarfKnitId = `honey-scarf-knit-${baseId}`;
  const cupId = `honey-cup-${baseId}`;
  const cupLidId = `honey-cup-lid-${baseId}`;

  const leftEyeRy = expression === 'wink' ? 1.8 : 12;
  const mouthPath =
    expression === 'happy'
      ? 'M 86 117 Q 100 130 114 117'
      : expression === 'thinking'
        ? 'M 88 120 Q 100 124 112 118'
        : 'M 89 117 Q 100 125 111 117';

  if (compact) {
    return (
      <div
        className={`relative inline-block ${className}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <radialGradient id={furId} cx="38%" cy="28%" r="74%">
              <stop offset="0%" stopColor="#FFD985" />
              <stop offset="58%" stopColor="#F3A63C" />
              <stop offset="100%" stopColor="#D97B22" />
            </radialGradient>
            <radialGradient id={creamId} cx="45%" cy="30%" r="75%">
              <stop offset="0%" stopColor="#FFF7E8" />
              <stop offset="100%" stopColor="#F4D09C" />
            </radialGradient>
            <linearGradient id={scarfId} x1="20" y1="0" x2="80" y2="0">
              <stop offset="0%" stopColor="#9BC9FF" />
              <stop offset="100%" stopColor="#4D8EDB" />
            </linearGradient>
          </defs>

          <path d="M 20 38 L 16 13 C 15 7 21 5 27 10 L 39 23 Z" fill={`url(#${furId})`} />
          <path d="M 80 38 L 84 13 C 85 7 79 5 73 10 L 61 23 Z" fill={`url(#${furId})`} />
          <path d="M 21 28 L 19 14 C 19 12 21 11 23 13 L 32 23 Z" fill="#F8B7A6" />
          <path d="M 79 28 L 81 14 C 81 12 79 11 77 13 L 68 23 Z" fill="#F8B7A6" />

          <circle cx="50" cy="49" r="34" fill={`url(#${furId})`} />
          <ellipse cx="50" cy="61" rx="22" ry="17" fill={`url(#${creamId})`} />

          <ellipse cx="36" cy="47" rx="11" ry="13" fill="#FFFDF9" />
          <ellipse cx="64" cy="47" rx="11" ry="13" fill="#FFFDF9" />
          <ellipse cx="36" cy="49" rx="6.5" ry={expression === 'wink' ? 1.3 : 8} fill="#4B260D" />
          <ellipse cx="64" cy="49" rx="6.5" ry="8" fill="#4B260D" />
          <circle cx="33.5" cy="45.5" r="2.4" fill="white" />
          <circle cx="61.5" cy="45.5" r="2.4" fill="white" />
          <circle cx="38.5" cy="52" r="1.2" fill="rgba(255,255,255,0.72)" />
          <circle cx="66.5" cy="52" r="1.2" fill="rgba(255,255,255,0.72)" />

          <ellipse cx="27" cy="62" rx="7" ry="3.5" fill="#F49B91" opacity="0.52" />
          <ellipse cx="73" cy="62" rx="7" ry="3.5" fill="#F49B91" opacity="0.52" />
          <path d="M 45 58 L 55 58 L 50 64 Z" fill="#ED8791" />
          <path d="M 50 64 L 50 68" stroke="#8B542C" strokeWidth="1.7" strokeLinecap="round" />
          <path d="M 50 68 Q 44 74 39 68 M 50 68 Q 56 74 61 68" stroke="#8B542C" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          <path d="M 30 28 Q 35 34 36 39 M 50 22 Q 50 31 50 37 M 70 28 Q 65 34 64 39" stroke="#C56B20" strokeWidth="2.3" strokeLinecap="round" />

          <path d="M 20 82 Q 50 74 80 82 L 74 100 H 26 Z" fill={`url(#${furId})`} />
          <path d="M 23 83 Q 50 76 77 83 Q 76 92 71 96 Q 50 91 29 96 Q 24 92 23 83 Z" fill={`url(#${scarfId})`} />
          <path d="M 29 86 Q 50 81 71 86" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size * 1.3 }}
    >
      <style>{`
        @keyframes honey-float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }
        @keyframes honey-tail {
          0%, 100% { transform-origin: 82px 196px; transform: rotate(0deg); }
          35% { transform-origin: 82px 196px; transform: rotate(8deg); }
          70% { transform-origin: 82px 196px; transform: rotate(-6deg); }
        }
        @keyframes honey-blink {
          0%, 89%, 100% { transform: scaleY(1); }
          94% { transform: scaleY(0.08); }
        }
        @keyframes honey-whisker {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
        }
        .honey-float { animation: honey-float 4s ease-in-out infinite; }
        .honey-tail { animation: honey-tail 2.8s ease-in-out infinite; }
        .honey-blink { animation: honey-blink 5.4s ease-in-out infinite; transform-origin: center; }
        .honey-whisker-l { animation: honey-whisker 3s ease-in-out infinite; transform-origin: 80px 108px; }
        .honey-whisker-r { animation: honey-whisker 3s ease-in-out infinite reverse; transform-origin: 120px 108px; }
      `}</style>

      <svg
        viewBox="0 0 200 265"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={animated ? 'honey-float' : ''}
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          <filter id={shadowId} x="-25%" y="-25%" width="170%" height="180%">
            <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="rgba(74, 45, 15, 0.22)" />
          </filter>
          <radialGradient id={furId} cx="42%" cy="28%" r="70%">
            <stop offset="0%" stopColor="#FFD57D" />
            <stop offset="45%" stopColor="#F2AC49" />
            <stop offset="78%" stopColor="#D9892F" />
            <stop offset="100%" stopColor="#B7651E" />
          </radialGradient>
          <radialGradient id={creamId} cx="50%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FFF0D7" />
            <stop offset="60%" stopColor="#F1D5AE" />
            <stop offset="100%" stopColor="#DEBE90" />
          </radialGradient>
          <radialGradient id={eyeId} cx="40%" cy="35%" r="75%">
            <stop offset="0%" stopColor="#8C4D12" />
            <stop offset="55%" stopColor="#69350C" />
            <stop offset="100%" stopColor="#2F1907" />
          </radialGradient>
          <linearGradient id={scarfId} x1="52" y1="129" x2="148" y2="186">
            <stop offset="0%" stopColor="#90BBF4" />
            <stop offset="48%" stopColor="#5D93D5" />
            <stop offset="100%" stopColor="#316FB6" />
          </linearGradient>
          <linearGradient id={scarfShadeId} x1="95" y1="132" x2="108" y2="190">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(26,53,95,0.3)" />
          </linearGradient>
          <pattern id={scarfKnitId} width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 0 7 C 2 3 2 3 4 7 C 6 3 6 3 8 7" stroke="rgba(255,255,255,0.34)" strokeWidth="1.2" fill="none" />
            <path d="M 0 1 C 2 5 2 5 4 1 C 6 5 6 5 8 1" stroke="rgba(29,76,138,0.22)" strokeWidth="1.1" fill="none" />
          </pattern>
          <linearGradient id={cupId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5E6D3" />
            <stop offset="100%" stopColor="#D5BE9F" />
          </linearGradient>
          <linearGradient id={cupLidId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DDC5AA" />
            <stop offset="100%" stopColor="#B99B7A" />
          </linearGradient>
        </defs>

        <ellipse cx="102" cy="252" rx="46" ry="9" fill="rgba(64,36,10,0.12)" />

        <g className={animated ? 'honey-tail' : ''}>
          <path
            d="M 82 199 C 47 194 33 169 41 144 C 49 121 69 122 74 139 C 67 153 76 166 97 171"
            stroke="#A95D1B"
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 82 199 C 47 194 33 169 41 144 C 49 121 69 122 74 139 C 67 153 76 166 97 171"
            stroke={`url(#${furId})`}
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />
          {!compact && (
            <>
              <path d="M 49 166 Q 60 163 67 170" stroke="#C36D21" strokeWidth="3" strokeLinecap="round" />
              <path d="M 43 151 Q 54 148 61 155" stroke="#C36D21" strokeWidth="3" strokeLinecap="round" />
            </>
          )}
        </g>

        <g filter={`url(#${shadowId})`}>
          <path
            d="M 69 130 C 74 120 89 115 102 118 C 121 121 133 134 134 152 L 136 204 C 136 222 122 236 101 236 C 81 236 66 222 66 203 L 67 149 C 67 142 67 136 69 130 Z"
            fill={`url(#${furId})`}
          />
          <ellipse cx="101" cy="184" rx="26" ry="40" fill={`url(#${creamId})`} />
        </g>

        {!compact && (
          <>
            <path d="M 74 160 Q 83 152 91 159" stroke="#BE6A20" strokeWidth="3" strokeLinecap="round" />
            <path d="M 113 156 Q 121 150 130 157" stroke="#BE6A20" strokeWidth="3" strokeLinecap="round" />
            <path d="M 77 175 Q 86 168 93 174" stroke="#C87728" strokeWidth="2.5" strokeLinecap="round" opacity="0.82" />
            <path d="M 109 172 Q 118 165 127 171" stroke="#C87728" strokeWidth="2.5" strokeLinecap="round" opacity="0.82" />
          </>
        )}

        <path
          d="M 68 134 C 83 126 119 127 140 135 C 143 143 141 152 134 158 C 113 164 86 165 66 156 C 61 150 61 140 68 134 Z"
          fill={`url(#${scarfId})`}
        />
        <path
          d="M 76 138 C 90 133 116 134 132 140"
          stroke="rgba(255,255,255,0.32)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path d="M 67 137 C 84 130 119 132 138 138 C 140 143 139 150 135 154 C 114 160 86 161 67 153 C 64 148 64 142 67 137 Z" fill={`url(#${scarfKnitId})`} opacity="0.7" />
        {!compact && (
          <>
            <path d="M 84 131 C 98 140 108 151 111 165" stroke={`url(#${scarfShadeId})`} strokeWidth="17" strokeLinecap="round" />
            <path d="M 108 153 L 118 197" stroke={`url(#${scarfId})`} strokeWidth="17" strokeLinecap="round" />
            <path d="M 124 150 L 133 191" stroke={`url(#${scarfId})`} strokeWidth="14" strokeLinecap="round" />
            <path d="M 110 157 L 117 195 M 126 154 L 132 189" stroke={`url(#${scarfKnitId})`} strokeWidth="11" strokeLinecap="round" opacity="0.8" />
            <path d="M 107 196 L 107 208 M 113 196 L 113 210 M 119 194 L 119 207" stroke="#4E7DBD" strokeWidth="2" strokeLinecap="round" />
            <path d="M 128 190 L 128 201 M 133 188 L 133 199" stroke="#4E7DBD" strokeWidth="2" strokeLinecap="round" />
            <path d="M 111 178 C 118 179 120 184 116 190 C 111 194 106 191 106 186 C 106 182 108 180 111 178 Z" fill="#6C8B49" stroke="#4F6339" strokeWidth="1" />
            <path d="M 108 189 L 117 181 M 111 187 L 115 188 M 113 185 L 112 182" stroke="#B8CE8D" strokeWidth="1" strokeLinecap="round" />
            <path d="M 128 171 C 135 172 137 177 133 183 C 128 187 123 184 123 179 C 123 175 125 173 128 171 Z" fill="#7D9E56" stroke="#4F6339" strokeWidth="1" />
            <path d="M 125 182 L 134 174 M 128 180 L 132 181 M 130 178 L 129 175" stroke="#C4D79D" strokeWidth="1" strokeLinecap="round" />
          </>
        )}

        <path d="M 74 193 C 86 193 91 203 86 213 C 79 223 67 219 66 208 C 65 200 69 194 74 193 Z" fill={`url(#${furId})`} />
        <path d="M 74 197 C 79 197 82 201 80 207" stroke="#E9C691" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />

        {showCup && !compact && (
          <g transform="translate(119 154)">
            <ellipse cx="24" cy="0" rx="18" ry="5" fill="#DCC7AA" />
            <path d="M 10 2 H 38 L 34 10 H 14 Z" fill={`url(#${cupLidId})`} />
            <rect x="18" y="-2" width="7" height="2.3" rx="1.1" fill="#8B6E54" />
            <path d="M 11 11 H 37 L 33 58 C 32.3 63 28 67 24 67 C 19.5 67 15.6 63 15 58 L 11 11 Z" fill={`url(#${cupId})`} stroke="#C8AE8E" strokeWidth="1.2" />
            <path d="M 14 27 C 20 23 29 23 35 27" stroke="#9B7A56" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="24" cy="39" r="8.5" stroke="#6F5332" strokeWidth="1.5" fill="none" />
            <path d="M 24 31 C 21 37 20 42 24 47 C 28 42 27 37 24 31 Z" fill="#6C8B49" />
            <path d="M 24 33 L 24 45" stroke="#4F6339" strokeWidth="1.2" strokeLinecap="round" />
            <text x="24" y="17" textAnchor="middle" fontSize="5.4" fill="#5E4A34" style={{ letterSpacing: '0.4px' }}>
              PHA
            </text>
          </g>
        )}

        <path d="M 134 187 C 145 186 151 195 149 205 C 147 215 135 219 128 212 C 122 206 125 189 134 187 Z" fill={`url(#${furId})`} />

        <g filter={`url(#${shadowId})`}>
          <g transform="rotate(-8 101 87)">
            <path d="M 63 66 L 49 34 C 46 27 51 18 60 19 C 72 21 83 35 86 56 Z" fill={`url(#${furId})`} />
            <path d="M 137 66 L 151 34 C 154 27 149 18 140 19 C 128 21 117 35 114 56 Z" fill={`url(#${furId})`} />
            <path d="M 62 61 L 54 36 C 52 31 56 25 63 27 C 71 29 77 38 79 54 Z" fill="#F3C3A7" />
            <path d="M 138 61 L 146 36 C 148 31 144 25 137 27 C 129 29 123 38 121 54 Z" fill="#F3C3A7" />
            <circle cx="101" cy="87" r="47" fill={`url(#${furId})`} />
            {!compact && (
              <>
                <path d="M 90 53 Q 95 64 92 72" stroke="#B6631E" strokeWidth="3.3" strokeLinecap="round" />
                <path d="M 100 50 Q 100 62 100 72" stroke="#B6631E" strokeWidth="3.6" strokeLinecap="round" />
                <path d="M 110 53 Q 105 64 108 72" stroke="#B6631E" strokeWidth="3.3" strokeLinecap="round" />
                <path d="M 81 59 Q 87 67 86 77" stroke="#CC7A2A" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M 119 59 Q 113 67 114 77" stroke="#CC7A2A" strokeWidth="2.2" strokeLinecap="round" />
              </>
            )}
          </g>
        </g>

        <path d="M 80 98 C 84 90 94 87 101 87 C 109 87 119 90 122 98 C 117 111 107 118 100 118 C 92 118 83 111 80 98 Z" fill={`url(#${creamId})`} />

        <ellipse cx="81" cy="86" rx="15" ry="16" fill="#FFF8F1" />
        <ellipse cx="119" cy="86" rx="15" ry="16" fill="#FFF8F1" />
        <g className={animated ? 'honey-blink' : ''}>
          <ellipse cx="81" cy="87" rx="11.5" ry={leftEyeRy} fill={`url(#${eyeId})`} />
          <ellipse cx="119" cy="87" rx="11.5" ry="12" fill={`url(#${eyeId})`} />
          <ellipse cx="82" cy="88" rx="5.2" ry={expression === 'wink' ? 0.8 : 8.5} fill="#130D0B" />
          <ellipse cx="120" cy="88" rx="5.2" ry="8.5" fill="#130D0B" />
          <circle cx="77" cy="81" r="3.2" fill="white" />
          <circle cx="116" cy="81" r="3.2" fill="white" />
          {!compact && (
            <>
              <circle cx="85" cy="93" r="1.5" fill="rgba(255,255,255,0.6)" />
              <circle cx="123" cy="93" r="1.5" fill="rgba(255,255,255,0.6)" />
            </>
          )}
        </g>
        {expression === 'wink' && (
          <path d="M 69 88 Q 81 95 92 88" stroke="#A9642B" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}

        <path d="M 95 101 L 105 101 L 100 108 Z" fill="#F09698" />
        <path d="M 100 108 L 100 115" stroke="#9D6B3E" strokeWidth="1.5" strokeLinecap="round" />
        <path d={mouthPath} stroke="#84572E" strokeWidth="2.1" strokeLinecap="round" fill="none" />
        <ellipse cx="68" cy="108" rx="11" ry="6" fill="#F2B6A7" opacity="0.35" />
        <ellipse cx="132" cy="108" rx="11" ry="6" fill="#F2B6A7" opacity="0.35" />

        {!compact && (
          <>
            <g className={animated ? 'honey-whisker-l' : ''}>
              <path d="M 78 102 L 33 93" stroke="#F3E3CB" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 78 109 L 30 108" stroke="#F3E3CB" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 78 115 L 34 123" stroke="#F3E3CB" strokeWidth="1.8" strokeLinecap="round" />
            </g>
            <g className={animated ? 'honey-whisker-r' : ''}>
              <path d="M 122 102 L 167 93" stroke="#F3E3CB" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 122 109 L 170 108" stroke="#F3E3CB" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 122 115 L 166 123" stroke="#F3E3CB" strokeWidth="1.8" strokeLinecap="round" />
            </g>
          </>
        )}

        <path d="M 79 224 C 91 223 95 236 89 245 C 81 254 65 251 64 239 C 63 229 72 224 79 224 Z" fill={`url(#${furId})`} />
        <path d="M 122 224 C 134 223 138 236 132 245 C 124 254 108 251 107 239 C 106 229 115 224 122 224 Z" fill={`url(#${furId})`} />
        <path d="M 73 244 L 73 251 M 80 243 L 80 251 M 87 243 L 87 250" stroke="#A65F20" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 116 244 L 116 251 M 123 243 L 123 251 M 130 243 L 130 250" stroke="#A65F20" strokeWidth="1.5" strokeLinecap="round" />

        {expression === 'thinking' && !compact && (
          <g>
            <circle cx="154" cy="55" r="3" fill="rgba(93,147,213,0.45)" />
            <circle cx="165" cy="43" r="5" fill="rgba(93,147,213,0.55)" />
            <rect x="169" y="18" width="28" height="20" rx="8" fill="rgba(61,112,178,0.92)" />
            <text x="183" y="32" textAnchor="middle" fontSize="11" fill="white">
              ?
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}
