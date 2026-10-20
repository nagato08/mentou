import Link from "next/link";
import Icon from "./Icon";

export type Crumb = { name: string; href?: string };

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-slate">
        {items.map((c, i) => (
          <li key={c.name} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevronDown" className="h-3.5 w-3.5 -rotate-90 text-muted" />}
            {c.href ? (
              <Link href={c.href} className="hover:text-primary">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-semibold text-ink">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
