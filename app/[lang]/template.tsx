// Recréé à chaque navigation : sert de transition d'entrée de page (CSS .page-enter).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
