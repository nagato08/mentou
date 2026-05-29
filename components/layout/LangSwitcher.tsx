/* eslint-disable react-hooks/immutability */
"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n-config";

type LangSwitcherProps = {
  currentLang: Locale;
};

export default function LangSwitcher({ currentLang }: LangSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (next: Locale) => {
    if (next === currentLang) return;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=31536000; samesite=lax`;
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  };

  return (
    <div className="flex items-center gap-1 text-xs uppercase tracking-[0.2em]">
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={loc === currentLang ? "true" : undefined}
            className={
              loc === currentLang
                ? "text-gold"
                : "text-bone/50 hover:text-bone transition-colors"
            }
          >
            {loc}
          </button>
          {i < locales.length - 1 && <span className="text-bone/20">/</span>}
        </span>
      ))}
    </div>
  );
}
