"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PreferenceForm from '@/components/PreferenceForm';
import ChallengeBanner from '@/components/ChallengeBanner';
import RecommendationList from '@/components/RecommendationList';
import BundleSuggestion from '@/components/BundleSuggestion';
import EmptyState from '@/components/EmptyState';
import { getBundles, getRecommendations } from '@/lib/recommender';
import { BundleSuggestion as Bundle, Recommendation, UserProfile } from '@/lib/types';
import { useCallback, useMemo, useState } from 'react';

export default function Page() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [bundles, setBundles] = useState<Bundle[]>([]);

  const onProfileChange = useCallback((p: UserProfile) => {
    setProfile(p);
    const r = getRecommendations(p, 18);
    setRecs(r);
    setBundles(getBundles(p));
  }, []);

  const onPickChallenge = useCallback((tags: string[]) => {
    if (!profile) return;
    const newProfile: UserProfile = { ...profile, favoriteMoods: Array.from(new Set([...(profile.favoriteMoods||[]), ...tags])) };
    setProfile(newProfile);
    const r = getRecommendations(newProfile, 18);
    setRecs(r);
    setBundles(getBundles(newProfile));
  }, [profile]);

  const leadLine = useMemo(() => {
    const lines = [
      '??? ??? ?? ??? ???? ???????? ???? ?? ?? ??? ???!',
      '?? ???? ?? ? ???? ????? ????????? ??????:',
      '??? ??? ????? ???? ? ??? ????? ????? ??? ???!'
    ];
    return lines[Math.floor(Math.random() * lines.length)];
  }, [recs.length]);

  return (
    <main>
      <Header />

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ChallengeBanner onPick={onPickChallenge} />
        <PreferenceForm onChange={onProfileChange} />

        <div className="panel">
          <div className="cardTitle" style={{ marginBottom: 8 }}>{leadLine}</div>
          {recs.length ? <RecommendationList recs={recs} /> : <EmptyState />}
        </div>

        {bundles.length ? (
          <div className="panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16 }}>
            <div style={{ gridColumn: 'span 12' }} className="cardTitle">???????? ???????? ???? ??? ????</div>
            {bundles.map(b => (
              <div key={b.theme} style={{ gridColumn: 'span 6' }}>
                <BundleSuggestion bundle={b} />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <Footer />
    </main>
  );
}
