import { ComponentPropsWithoutRef } from "react";
import cx from "classnames";

export const Tag = ({
  children,
  className,
  color = "#B9D09A",
  ...props
}: { color?: string } & ComponentPropsWithoutRef<"button">) => {
  return (
    <span
      className={cx(
        `flex gap-4 px-3 py-1 rounded-xs items-center justify-between bg-[${color}] text-secondary text-sm`,
        className
      )}
      // TODO: find out why arbitrary value is not working
      style={{ backgroundColor: color }}
    >
      {children}
    </span>
  );
};
