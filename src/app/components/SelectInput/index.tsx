import { ComponentPropsWithoutRef } from "react";
import cx from "classnames";
import Select from "react-select";

export type SelectItem = {
  label: string;
  value: string;
};

type SelectInputProps = {
  label?: string;
  layout?: "horizontal" | "vertical";
  size?: "sm" | "md";
  options: SelectItem[];
  onChange(value: any): void;
} & Pick<
  ComponentPropsWithoutRef<"select">,
  "name" | "id" | "className" | "defaultValue" | "value"
>;

export const SelectInput = ({
  id,
  layout = "horizontal",
  size = "md",
  label,
  ...inputProps
}: SelectInputProps) => {
  return (
    <div
      className={cx(
        "flex",
        layout === "vertical" ? "gap-2 items-center" : "flex-col gap-1"
      )}
    >
      {label && (
        <label
          htmlFor={id}
          className={cx(
            "text-secondary-100",
            size === "sm" ? "text-sm" : "text-md"
          )}
        >
          {label}
        </label>
      )}

      {/* @ts-ignore */}
      <Select isMulti id={id} {...inputProps} />
    </div>
  );
};
