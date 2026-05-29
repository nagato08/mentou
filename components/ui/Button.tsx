import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "ghost" | "outline";

type Common = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type AsLink = Common & { href: string; type?: never; onClick?: never };
type AsButton = Common & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

type ButtonProps = AsLink | AsButton;

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-gold text-ink hover:bg-gold-soft border border-gold",
  ghost:
    "bg-transparent text-bone border border-bone/30 hover:border-gold hover:text-gold",
  outline:
    "bg-transparent text-gold border border-gold hover:bg-gold hover:text-ink",
};

const base =
  "inline-flex items-center justify-center px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-medium transition-colors duration-300";

export default function Button(props: ButtonProps) {
  const variant = props.variant ?? "outline";
  const classes = `${base} ${variantClass[variant]} ${props.className ?? ""}`;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return (
    <button type={props.type ?? "button"} onClick={props.onClick} className={classes}>
      {props.children}
    </button>
  );
}
