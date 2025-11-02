"use client";

import { useEffect, useMemo, useState } from 'react';
import Tag from './Tag';
import { saveProfile, loadProfile } from '@/lib/storage';
import { UserProfile } from '@/lib/types';

const ALL_GENRES = ['????','????','????','?????','???????','?????-?????','?????????','????????','?????','?????? ????','??????','??????????','?????','????','???????','?????'];
const ALL_MOODS = ['????','?????','??????','?????','??????','?????????','???????','?????','??????','????????','?????'];
const ALL_TYPES = [
  { key: 'movie', label: '????' },
  { key: 'series', label: '?????' },
  { key: 'music', label: '??????' },
  { key: 'book', label: '????' },
  { key: 'podcast', label: '??????' },
] as const;

export default function PreferenceForm({ onChange }: { onChange: (p: UserProfile) => void }) {
  const [favoriteGenres, setFavoriteGenres] = useState<string[]>([]);
  const [dislikedGenres, setDislikedGenres] = useState<string[]>([]);
  const [favoriteMoods, setFavoriteMoods] = useState<string[]>(['?????']);
  const [energy, setEnergy] = useState<'low'|'medium'|'high'>('medium');
  const [timeOfDay, setTimeOfDay] = useState<'morning'|'afternoon'|'evening'|'late-night'>('evening');
  const [preferredTypes, setPreferredTypes] = useState<UserProfile['preferredTypes']>(['movie','music','series']);
  const [wantHiddenGems, setWantHiddenGems] = useState(true);

  useEffect(() => {
    const stored = loadProfile();
    if (stored) {
      setFavoriteGenres(stored.favoriteGenres ?? []);
      setDislikedGenres(stored.dislikedGenres ?? []);
      setFavoriteMoods(stored.favoriteMoods ?? []);
      setEnergy(stored.energy);
      setTimeOfDay(stored.timeOfDay);
      setPreferredTypes(stored.preferredTypes);
      setWantHiddenGems(stored.wantHiddenGems);
    }
  }, []);

  const profile: UserProfile = useMemo(() => ({
    favoriteGenres,
    dislikedGenres,
    favoriteMoods,
    energy,
    timeOfDay,
    preferredTypes,
    wantHiddenGems,
    locale: 'fa',
  }), [favoriteGenres, dislikedGenres, favoriteMoods, energy, timeOfDay, preferredTypes, wantHiddenGems]);

  useEffect(() => {
    saveProfile(profile);
    onChange(profile);
  }, [profile, onChange]);

  function toggle(arr: string[], set: (v: string[]) => void, v: string) {
    set(arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]);
  }

  function toggleType(k: any) {
    setPreferredTypes(preferredTypes.includes(k) ? preferredTypes.filter(x => x !== k) : [...preferredTypes, k]);
  }

  return (
    <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontWeight: 900, fontSize: 18 }}>???? ???? ?? ???? ?????</div>
      <div className="grid">
        <div style={{ gridColumn: 'span 12' }}>
          <div className="small" style={{ marginBottom: 8 }}>??????? ?????</div>
          <div className="row">
            {ALL_GENRES.map(g => (
              <Tag key={g} label={g} active={favoriteGenres.includes(g)} onClick={() => toggle(favoriteGenres, setFavoriteGenres, g)} />
            ))}
          </div>
        </div>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="small" style={{ marginBottom: 8 }}>??????? ???? ????? ????</div>
          <div className="row">
            {ALL_GENRES.map(g => (
              <Tag key={g} label={g} active={dislikedGenres.includes(g)} onClick={() => toggle(dislikedGenres, setDislikedGenres, g)} />
            ))}
          </div>
        </div>
        <div style={{ gridColumn: 'span 12' }}>
          <div className="small" style={{ marginBottom: 8 }}>????????? ????</div>
          <div className="row">
            {ALL_MOODS.map(m => (
              <Tag key={m} label={m} active={favoriteMoods.includes(m)} onClick={() => toggle(favoriteMoods, setFavoriteMoods, m)} />
            ))}
          </div>
        </div>

        <div style={{ gridColumn: 'span 6' }}>
          <div className="small" style={{ marginBottom: 8 }}>??? ?????</div>
          <div className="row">
            {(['low','medium','high'] as const).map(e => (
              <button key={e} className={`chip ${energy === e ? 'active' : ''}`} onClick={() => setEnergy(e)}>
                {e === 'low' ? '????' : e === 'medium' ? '??????' : '????????'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: 'span 6' }}>
          <div className="small" style={{ marginBottom: 8 }}>????</div>
          <div className="row">
            {(['morning','afternoon','evening','late-night'] as const).map(t => (
              <button key={t} className={`chip ${timeOfDay === t ? 'active' : ''}`} onClick={() => setTimeOfDay(t)}>
                {t === 'morning' ? '???' : t === 'afternoon' ? '????????' : t === 'evening' ? '????/??' : '???????'}
              </button>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: 'span 12' }}>
          <div className="small" style={{ marginBottom: 8 }}>?? ??????/???????</div>
          <div className="row">
            {ALL_TYPES.map(t => (
              <button key={t.key} className={`chip ${preferredTypes.includes(t.key as any) ? 'active' : ''}`} onClick={() => toggleType(t.key)}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ gridColumn: 'span 12', display: 'flex', alignItems: 'center', gap: 10 }}>
          <input id="hidden-gems" type="checkbox" checked={wantHiddenGems} onChange={() => setWantHiddenGems(!wantHiddenGems)} />
          <label htmlFor="hidden-gems" className="small">???????? ?????????????? ?? ??????? ???</label>
        </div>
      </div>
    </div>
  );
}
