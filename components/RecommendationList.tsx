"use client";

import RecommendationCard from './RecommendationCard';
import { Recommendation } from '@/lib/types';

export default function RecommendationList({ recs }: { recs: Recommendation[] }) {
  if (!recs.length) {
    return <div className="card">????? ???? ???? ????? ??????. ?? ?? ???????? ?? ??????? ?? ??</div>;
  }
  return (
    <div className="grid">
      {recs.map((r) => (
        <div key={r.content.id} style={{ gridColumn: 'span 6' }}>
          <RecommendationCard item={r.content} pitch={r.pitch} />
        </div>
      ))}
    </div>
  );
}
