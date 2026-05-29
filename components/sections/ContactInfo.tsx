type InfoItem = {
  label: string;
  value: string;
  href: string | null;
  note: string;
};

type Props = {
  eyebrow: string;
  title: string;
  items: InfoItem[];
};

export default function ContactInfo({ eyebrow, title, items }: Props) {
  return (
    <div className="flex flex-col gap-10" data-gsap="fade-left">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="block h-px w-8 bg-gold" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-bone">
          {title}
        </h2>
      </div>

      <ul className="flex flex-col">
        {items.map((item) => {
          const content = (
            <div className="flex flex-col gap-1">
              <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
                {item.label}
              </span>
              <span className="font-display text-2xl md:text-3xl text-bone group-hover:text-gold transition-colors duration-300">
                {item.value}
              </span>
              <span className="text-sm text-bone/50">{item.note}</span>
            </div>
          );
          return (
            <li key={item.label} className="group border-t border-bone/10 py-6 md:py-8 last:border-b">
              {item.href ? (
                <a href={item.href} className="block">
                  {content}
                </a>
              ) : (
                content
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
