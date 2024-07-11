import React, { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { Link } from "react-router-dom";
import convertNumbThousand from "utils/convertNumbThousand";
import { Property } from "types/property";

export interface CardProperty5Props {
  className?: string;
  property: Property;
}

const CardProperty5: FC<CardProperty5Props> = ({
  className = "",
  property,
}) => {
  return (
    <Link
      to={`/property/${property.property_id}`}
      className={`nc-CardProperty5 flex flex-col ${className}`}
      data-nc-id="CardProperty5"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-4 aspect-h-3 h-0 rounded-2xl overflow-hidden group`}
      >
        <NcImage
          src={property.images[0].image}
          className="object-cover w-full h-full rounded-2xl"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 px-3 truncate">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {property.property_title}
        </h2>
        <span
          className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {property.property_type}
        </span>
      </div>
    </Link>
  );
};

export default CardProperty5;
