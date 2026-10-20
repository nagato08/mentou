import Link from "next/link";
import { type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";
type ButtonSize = "md" | "lg";

type Common = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type AsLink = Common & { href: string; type?: never; onClick?: never; disabled?: never };
type AsButton = Common & {
  href?: never;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonProps = AsLink | AsButton;

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-lift hover:bg-primary-dark active:translate-y-px",
  secondary:
    "bg-white text-ink border border-line hover:border-primary hover:text-primary",
  ghost: "text-primary hover:bg-sky",
  light: "bg-white text-primary hover:bg-sky",
};

const sizeClass: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-13 px-7 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50";

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = ""
): string {
  return `${base} ${variantClass[variant]} ${sizeClass[size]} ${extra}`;
}

export default function Button(props: ButtonProps) {
  const classes = buttonClass(props.variant, props.size, props.className);

  if ("href" in props && props.href) {
    // Liens tel:/mailto: : balise <a> native.
    if (/^(tel|mailto):/.test(props.href)) {
      return (
        <a href={props.href} className={classes}>
          {props.children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      disabled={props.disabled}
      className={classes}
    >
      {props.children}
    </button>
  );
}
