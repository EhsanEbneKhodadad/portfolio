export function StackPlane({ layer }: { layer: number }) {
  return <svg className="plane" viewBox="0 0 520 200" aria-hidden="true" focusable="false">
    <path className="plane-edge" d="M1 93 260 185 519 93v15L260 199 1 108Z" />
    <path className="plane-face" d="M1 93 260 1 519 93 260 185Z" />
    {layer === 0 && <g className="plane-detail">
      <path d="m140 73 120-44 120 44-120 44Z" />
      <path d="m180 81 80-30 80 30-80 30Z" />
      <path className="interface-core" d="m220 89 40-15 40 15-40 15Z" />
    </g>}
    {layer === 1 && <>
      <path className="plane-grid" d="m131 47 259 92m0-92-259 92M66 70l259 92m129-92-259 92" />
      <g className="service-nodes">
        <rect x="234" y="49" width="52" height="28" rx="7" />
        <rect x="149" y="79" width="52" height="28" rx="7" />
        <rect x="319" y="79" width="52" height="28" rx="7" />
        <rect x="234" y="109" width="52" height="28" rx="7" />
      </g>
    </>}
    {layer === 2 && <g className="plane-detail">
      <path d="m90 93 170-60 170 60-170 60Z" />
      <path d="m182 93 78-30 78 30-78 30Z" />
      <circle className="data-point-primary" cx="190" cy="93" r="3.5" />
      <circle cx="260" cy="63" r="3.5" />
      <circle cx="330" cy="93" r="3.5" />
      <circle cx="260" cy="123" r="3.5" />
    </g>}
  </svg>;
}
