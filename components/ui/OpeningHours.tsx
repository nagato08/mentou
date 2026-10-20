import type { SiteContent } from "@/content/types";
import Icon from "./Icon";

type Props = {
  labels: SiteContent["labels"];
  /** "light" sur fond clair, "dark" sur fond marine. */
  tone?: "light" | "dark";
  showTitle?: boolean;
};

/** Heures d'ouverture du centre (voir OPENING_HOURS dans lib/contact.ts). */
export default function OpeningHours({ labels, tone = "light", showTitle = true }: Props) {
  const dark = tone === "dark";
  const rows = [
    { day: labels.hoursWeekdays, time: labels.hoursWeekdaysTime },
    { day: labels.hoursWeekend, time: labels.hoursWeekendTime },
  ];
  return (
    <div className="flex flex-col gap-2">
      {showTitle && (
        <p className={`flex items-center gap-2 font-bold ${dark ? "text-white" : "text-ink"}`}>
          <Icon name="clock" className={`h-4 w-4 ${dark ? "text-accent" : "text-primary"}`} />
          {labels.hoursTitle}
        </p>
      )}
      <dl className="flex flex-col gap-1 text-sm">
        {rows.map((r) => (
          <div key={r.day} className="flex justify-between gap-4">
            <dt className={dark ? "text-white/75" : "text-slate"}>{r.day}</dt>
            <dd className={`font-semibold tabular-nums ${dark ? "text-white" : "text-ink"}`}>{r.time}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
