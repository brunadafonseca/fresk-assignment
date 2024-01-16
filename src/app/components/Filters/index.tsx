import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useCallback, useMemo, useState } from "react";
import { SelectInput, SelectItem, Tag } from "..";
import cx from "classnames";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import uniq from "lodash.uniq";
import capitalize from "lodash.capitalize";
import qs from "qs";

export type FilterItems = {
  brands?: string[];
  colors?: string[];
  types?: string[];
  playingTimes?: string[];
};

interface FiltersProps {
  items: FilterItems;
  appliedFilters: FilterItems;
}

const colorByFilter = {
  brands: "#B9D09A",
  types: "#D2A1C8",
  playTimes: "#A9AED8",
  colors: "#F19090",
};

export const Filters = ({ items, appliedFilters }: FiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const onFilterChange = (name: string, values: SelectItem[]) => {
    router.push(
      pathname +
        "?" +
        createQueryString(name, qs.stringify(values?.map(({ value }) => value)))
    );
  };

  const formatSelectOptions = (options: string[] | undefined) =>
    uniq(options)
      ?.filter((item?: string) => !!item)
      ?.map((item: string) => ({ value: item, label: capitalize(item) }));

  const brandNames = useMemo(() => formatSelectOptions(items?.brands), [items]);
  const colors = useMemo(() => formatSelectOptions(items?.colors), [items]);
  const types = useMemo(() => formatSelectOptions(items?.types), [items]);
  const playingTimes = useMemo(() => formatSelectOptions(items?.playingTimes), [
    items,
  ]);

  const defaultValues = useMemo(() => {
    let values: FilterItems = {
      brands: undefined,
      types: undefined,
      colors: undefined,
      playingTimes: undefined,
    };

    for (const [key, value] of Object.entries(appliedFilters)) {
      // TODO: fix type
      (values as any)[key] = value?.map((v) => ({
        label: v,
        value: v,
      }));
    }

    return values;
  }, [appliedFilters]);

  return (
    <>
      <div className="flex gap-3 justify-between items-center">
        <h2 className="text-sm font-bold mb-4 text-secondary-100">Filters:</h2>

        <button
          className="flex justify-center items-center w-5 h-5 lg:invisible"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDownIcon
            className={cx(
              "w-4 h-4 transition-transform",
              isExpanded && "-rotate-180"
            )}
          />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {Object.keys(appliedFilters || {})?.map((key) => (
          <Fragment key={`tags-${key}`}>
            {/* TODO: proper types */}
            {(appliedFilters as any)[key]?.map((item: string) => (
              <Tag key={`tag-${item}`} color={(colorByFilter as any)[key]}>
                {item}
              </Tag>
            ))}
          </Fragment>
        ))}
      </div>

      <div
        className={cx(
          "h-[1px] w-full bg-secondary transition-opacity",
          isExpanded ? "opacity-100" : "max-lg:opacity-0"
        )}
      />

      <div
        className={cx(
          "flex flex-col gap-4 lg:gap-5 mt-6 lg:mt-8",
          !isExpanded && "max-lg:hidden"
        )}
      >
        <SelectInput
          label="Brand name:"
          options={brandNames}
          name="brands"
          onChange={(values) => onFilterChange("brands", values)}
          value={defaultValues?.brands}
        />

        <SelectInput
          onChange={(values) => onFilterChange("types", values)}
          label="Type"
          options={types}
          name="types"
          value={defaultValues?.types}
        />

        <SelectInput
          onChange={(values) => onFilterChange("colors", values)}
          label="Color"
          options={colors}
          name="colors"
          value={defaultValues?.colors}
        />

        <SelectInput
          onChange={(values) => onFilterChange("playingTimes", values)}
          label="Playing time"
          options={playingTimes}
          name="playingTimes"
          value={defaultValues?.playingTimes}
        />
      </div>
    </>
  );
};
