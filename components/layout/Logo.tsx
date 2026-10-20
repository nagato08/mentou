import Image from "next/image";

type LogoProps = {
  name: string;
  size?: "md" | "lg";
};

/** Logo Mentou + nom « Mentou Academy ». */
export default function Logo({ name, size = "md" }: LogoProps) {
  const [first, ...rest] = name.split(" ");
  const img = size === "lg" ? "h-11" : "h-9";
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/logo-mark.png"
        alt=""
        width={268}
        height={205}
        className={`${img} w-auto object-contain`}
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="text-lg font-extrabold tracking-tight text-ink">{first}</span>
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          {rest.join(" ")}
        </span>
      </span>
    </span>
  );
}
