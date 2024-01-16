"use client";
import { useMemo } from "react";
import { Filters, ListItem } from "./components";
import useSWR from "swr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "qs";

// TODO TYPES
// @ts-ignore
const fetchItems = (...args) =>
  // @ts-ignore
  fetch(...args, {
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      data?.map((item: Record<string, ListItem[]>) =>
        item[Object.keys(item)[0]]?.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          { id: Object.keys(item)[0] }
        )
      )
    );

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { data, error, isLoading } = useSWR<ListItem[], Error>(
    "https://tapedeck-api-fresk.vercel.app/api",
    fetchItems
  );

  const dataByBrands = useMemo(
    () =>
      data?.reduce<Record<string, ListItem[]>>((obj, item) => {
        const brand = item?.brand || "Unknown";
        obj[brand] = [...(obj?.[brand] || []), item];

        return obj;
      }, {}),
    [data]
  );

  const filters = useMemo(
    () =>
      data?.reduce(
        (acc: any, curr) => ({
          brands: [...acc.brands, curr.brand],
          types: [...acc.types, curr.type],
          playingTimes: [...acc.playingTimes, curr.playingTime],
          colors: [...acc.colors, curr.color],
        }),
        {
          brands: [],
          colors: [],
          playingTimes: [],
          types: [],
        }
      ),
    [data]
  );

  const appliedFilters = useMemo(() => {
    return {
      brands: Object.values(qs.parse(searchParams.get("brands") || {})),
      types: Object.values(qs.parse(searchParams.get("types") || {})),
      playingTimes: Object.values(
        qs.parse(searchParams.get("playingTimes") || {})
      ),
      colors: Object.values(qs.parse(searchParams.get("colors") || {})),
    };
  }, [searchParams]);

  const hasAppliedFilters = Object.keys(appliedFilters || {})?.some(
    (filter) => !!filter.length
  );

  const filteredData = useMemo(
    () =>
      hasAppliedFilters
        ? Object.keys(dataByBrands || {})
            ?.filter(
              (brand) =>
                !appliedFilters?.brands?.length ||
                appliedFilters?.brands?.includes(brand)
            )
            .reduce((acc: any, brand) => {
              acc[brand] = dataByBrands?.[brand]?.filter(
                (item: ListItem) =>
                  (!appliedFilters?.brands?.length ||
                    appliedFilters?.brands?.includes(item?.brand)) &&
                  (!appliedFilters?.types?.length ||
                    appliedFilters?.types?.includes(item?.type)) &&
                  (!appliedFilters?.playingTimes?.length ||
                    appliedFilters?.playingTimes?.includes(
                      item?.playingTime
                    )) &&
                  (!appliedFilters?.colors?.length ||
                    appliedFilters?.colors?.includes(item?.playingTime))
              );

              return acc;
            }, {})
        : data,
    [data, dataByBrands, hasAppliedFilters, appliedFilters]
  );

  const clearAllFilters = () => {
    router?.push(pathname);
  };

  return (
    <main className="h-full w-full max-xl:min-w-full max-w-[1440px] min-xl:mx-auto min-xl:pt-14 lg:flex gap-2 md:gap-10 flex-grow max-h-full lg:overflow-hidden">
      {/* TODO sticky on mobile */}
      <aside className="bg-primary-200 rounded-sm p-3 md:p-6 lg:min-w-96 lg:max-w-96 md:min-h-full overflow-auto">
        <Filters items={filters} appliedFilters={appliedFilters as any} />
      </aside>

      <div className="p-3 pt-6 md:p-6 overflow-auto w-full max-h-full">
        <h1 className="text-sm font-bold mb-5 text-secondary-100">Results</h1>

        {error && <p>An error ocurred</p>}

        {/* todo spinner */}
        {((!data && !error) || isLoading) && <p>Loading...</p>}

        {data?.length && !Object.keys(filteredData || {})?.length && !error && (
          <div>
            <p className="mb-5">No results found</p>

            <button
              className="bg-primary-400 px-3 py-2 rounded-xs"
              onClick={clearAllFilters}
            >
              Clear all filters
            </button>
          </div>
        )}

        {!!data && !error && !!Object.keys(filteredData || {})?.length && (
          <ul className="flex flex-col gap-8">
            {Object.keys(filteredData || {})?.map((brand) => (
              <li key={brand}>
                <h3 className="mb-3 font-bold">{brand}</h3>

                <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredData?.[brand]?.map((item: ListItem) => (
                    <ListItem item={item} key={item?.id} />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
