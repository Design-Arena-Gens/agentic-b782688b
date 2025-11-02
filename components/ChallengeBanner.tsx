"use client";

import { challenges } from '@/data/challenges';

export default function ChallengeBanner({ onPick }: { onPick: (tags: string[]) => void }) {
  return (
    <div className="panel" style={{ display: 'flex', gap: 12, overflowX: 'auto' }}>
      {challenges.map(c => (
        <div key={c.id} className="card" style={{ minWidth: 280 }}>
          <div className="cardTitle">{c.title}</div>
          <div className="cardDesc" style={{ minHeight: 40 }}>{c.description}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button className="button" onClick={() => {
              const tags = c.id === 'fr-week' ? ['???????', '????'] : c.id === 'night-drive' ? ['?????','??????'] : ['????','?????????'];
              onPick(tags);
            }}>??????? ??</button>
            <button className="button secondary" onClick={() => onPick([])}>?????</button>
          </div>
        </div>
      ))}
    </div>
  );
}
