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
    <div className="inline-flex items-center rounded-full border border-line p-0.5 text-xs font-bold uppercase">
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          aria-current={loc === currentLang ? "true" : undefined}
          aria-label={loc === "fr" ? "Français" : "English"}
          className={`min-h-9 min-w-10 rounded-full px-2.5 transition-colors ${
            loc === currentLang
              ? "bg-sky text-primary"
              : "text-muted hover:text-ink"
          }`}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
