import Image from "next/image";

type LogoProps = {
  name: string;
  size?: "md" | "lg";
};

/** Logo Mentou + nom « Mentou Academy ». */
export default function Logo({ name, size = "md" }: LogoProps) {
  const [first, ...rest] = name.split(" ");
  const img = size === "lg" ? "h-12 w-12" : "h-10 w-10";
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src="/flyer/nouveau-logo.jpeg"
        alt=""
        width={48}
        height={48}
        className={`${img} rounded-full object-cover ring-1 ring-line`}
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
