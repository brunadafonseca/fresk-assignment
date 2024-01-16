import { XMarkIcon } from "@heroicons/react/24/outline";
import { ComponentPropsWithoutRef } from "react";
import cx from "classnames";

export const Tag = ({
  children,
  className,
  color = "#B9D09A",
  ...props
}: { color?: string } & ComponentPropsWithoutRef<"button">) => {
  return (
    <div
      className={cx(
        `flex gap-4 p-1 rounded-xs items-center justify-between bg-[${color}] text-secondary`,
        className
      )}
      // TODO: find out why arbitrary value is not working
      style={{ backgroundColor: color }}
    >
      <span className="text-sm">{children}</span>

      <button
        className="flex justify-center items-center w-5 h-5 rounded-full"
        {...props}
      >
        <XMarkIcon className="w-3 h-3" />
      </button>
    </div>
  );
};
