"use client";

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, active, onClick }: TagProps) {
  return (
    <button className={`chip ${active ? 'active' : ''}`} onClick={onClick} type="button">
      {label}
    </button>
  );
}
