import { type ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "main";
  className?: string;
  size?: "narrow" | "default" | "wide";
};

const sizeClass = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export default function Container({
  children,
  as: Tag = "div",
  className = "",
  size = "default",
}: ContainerProps) {
  return (
    <Tag className={`mx-auto w-full px-6 md:px-10 ${sizeClass[size]} ${className}`}>
      {children}
    </Tag>
  );
}
