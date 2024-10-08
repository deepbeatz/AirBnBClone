'use client';

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types/Index";
import Heading from "@/components/shared/Heading";
import Image from "next/image";
import HeartButton from "@/components/shared/HeartButton";

interface ListingHeadProps {
      title: string;
      locationValue: string;
      imageSrc: string;
      id: string;
      currentUser?: SafeUser | null;

}




const ListingHead: React.FC<ListingHeadProps> = ({ title, locationValue, imageSrc, id, currentUser }) => {

      const {getByValue} = useCountries();
      const location = getByValue(locationValue);
      return (
            <>
                  <Heading title={title} subtitle={`${location?.region} - ${location?.label}`}/>
                  <div className="w-full h-[80vh] overflow-hidden relative rounded-xl">
                        <Image src={imageSrc} fill className="object-cover w-full h-full" alt={title} />
                        <div className="absolute top-5 right-5">
                              <HeartButton listingId={id} currentUser={currentUser} />
                        </div>
                  </div>
            </>
      )
}

export default ListingHead