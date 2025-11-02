"use client";

import { BundleSuggestion as Bundle } from '@/lib/types';

export default function BundleSuggestion({ bundle }: { bundle: Bundle }) {
  return (
    <div className="card">
      <div className="cardTitle">{bundle.theme}</div>
      <div className="cardDesc" style={{ marginBottom: 8 }}>{bundle.blurb}</div>
      <div className="row">
        {bundle.items.map(i => (
          <div key={i.id} className="chip" title={i.description}>
            {i.type === 'movie' ? '??' : i.type === 'series' ? '??' : i.type === 'music' ? '??' : i.type === 'book' ? '??' : '???'}
            {' '}{i.title}
          </div>
        ))}
      </div>
    </div>
  );
}
