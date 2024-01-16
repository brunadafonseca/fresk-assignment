import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export type ListItem = {
  brand?: string;
  color?: string;
  id: string;
  img?: string;
  page?: string;
  playingTime?: string;
  thumb?: string;
  type?: string;
};

export const ListItem = ({ item }: { item: ListItem }) => {
  return (
    <li key={item?.id}>
      <a
        href={item.page}
        className="flex flex-col bg-primary-200 p-2 rounded-xs gap-4 shadow-sm hover:shadow-md transition-shadow lg:p-5"
      >
        {!!item?.thumb && (
          <Image
            src={item.thumb}
            alt="Tape thumbnail"
            width={300}
            height={200}
            className="rounded-sm shadow-sm mx-auto"
          />
        )}

        <div className="flex flex-col gap-2 text-xs border-t-[1px] border-t-primary pt-5">
          <h3 className="font-bold text-sm">{item.brand}</h3>
          <p>Type: {item.type}</p>
          <p>Color: {item.color}</p>
          <p className="mb-5">Playing time: {item.playingTime}</p>

          <div className="flex justify-between items-center gap-3 text-sm">
            View more <ArrowTopRightOnSquareIcon className="w-3 h-3" />
          </div>
        </div>
      </a>
    </li>
  );
};
