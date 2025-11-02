"use client";

import { ContentItem } from '@/lib/types';

export default function RecommendationCard({ item, pitch }: { item: ContentItem; pitch: string }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="cardTitle">{item.title}</div>
      <div className="cardDesc" style={{ minHeight: 40 }}>{item.description}</div>
      <div className="row" style={{ gap: 8 }}>
        <span className="chip" style={{ opacity: .9 }}>{item.type === 'movie' ? '????' : item.type === 'series' ? '?????' : item.type === 'music' ? '??????' : item.type === 'book' ? '????' : '??????'}</span>
        {item.genres.slice(0, 3).map(g => (
          <span key={g} className="chip" style={{ opacity: .7 }}>{g}</span>
        ))}
      </div>
      <div className="small" style={{ lineHeight: 1.6 }}>{pitch}</div>
    </div>
  );
}
