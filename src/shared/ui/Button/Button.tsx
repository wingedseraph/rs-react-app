import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  classNames?: string;
};

export default function Button({
  classNames,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx("focus:outline-secondary text-sm md:text-xl", classNames)}
      {...props}
    >
      {children}
    </button>
  );
}
