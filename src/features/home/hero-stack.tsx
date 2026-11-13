'use client';

import { useRef, useState, type PointerEvent } from 'react';
import { StackPlane } from './stack-plane';

const layers = [
  { name: 'Interface', tools: 'React · TypeScript', depth: 14 },
  { name: 'Services', tools: 'ASP.NET Core · REST', depth: 9 },
  { name: 'Data', tools: 'PostgreSQL · Elasticsearch', depth: 5 },
];

export function HeroStack() {
  const stack = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const active = focused ?? hovered ?? selected;

  function move(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setHovered(Math.max(0, Math.min(2, Math.floor((y + 0.5) * layers.length))));
    layers.forEach(({ depth }, index) => {
      stack.current?.style.setProperty('--x-' + index, x * depth * 2 + 'px');
      stack.current?.style.setProperty('--y-' + index, y * depth * 2 + 'px');
    });
  }

  function reset() {
    setHovered(null);
    layers.forEach((_, index) => {
      stack.current?.style.removeProperty('--x-' + index);
      stack.current?.style.removeProperty('--y-' + index);
    });
  }

  return <div className="stack" ref={stack} aria-label="Explore the application stack" role="group"
    onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
    {layers.map(({ name, tools }, index) => (
      <button className={'stack-layer layer-' + index} type="button" key={name}
        data-active={index === active} aria-pressed={index === selected} aria-label={name + ': ' + tools}
        onFocus={() => setFocused(index)} onBlur={() => setFocused(null)} onClick={() => setSelected(index)}>
        <StackPlane layer={index} />
        <span className="layer-name">{String(index + 1).padStart(2, '0')} / {name}</span>
        <span className="layer-tools">{tools}</span>
      </button>
    ))}
  </div>;
}
