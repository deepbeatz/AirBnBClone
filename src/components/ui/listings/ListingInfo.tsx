'use client';

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types/Index";
import { IconType } from "react-icons";
import Avatar from "@/components/shared/Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(()=>import("@/components/shared/Map"), {ssr: false})

interface ListingInfoProps {
      user: SafeUser;
      description: string;
      roomCount: number;
      guestCount: number;
      bathroomCount: number;
      category: {
            icon: IconType;
            label: string;
            description: string;

      } | undefined;
      locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
      user, roomCount, guestCount, bathroomCount, category, locationValue, description }) => {
      const { getByValue } = useCountries();
      const coordinates = getByValue(locationValue)?.latlng;


      return (
            <div className="col-span-4 flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                        <div className="text-xl font-semibold flex flex-row items-center gap-2">
                              <div className="">Hosted by {user?.name}</div>
                              <Avatar src={user?.image}/>
                        </div>
                        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                              <div className="">{guestCount} guests</div>
                              <div className="">{roomCount} rooms</div>
                              <div className="">{bathroomCount} bathrooms</div>
                        </div>
                  </div>
                  <hr />
                  {category && (
                        <ListingCategory icon={category.icon} label={category.label} description={category.description}  />
                  )}
                  <hr />
                  <div className="text-lg font-light text-neutral-500">
                        {description}
                  </div>
                  <hr />
                  <Map center={coordinates} />
            </div>
      )
}

export default ListingInfo