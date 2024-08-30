'use client';

import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "@/components/shared/Container";
import ListingHead from "@/components/ui/listings/ListingHead";
import ListingInfo from "@/components/ui/listings/ListingInfo";
import ListingReservation from "@/components/ui/listings/ListingReservation";
import { categories } from "@/components/ui/Navbar/Categories";
import useLoginModel from "@/hooks/useLogInModel";
import { SafeReservation, SafeUser } from "@/types/Index";
import { safeListings } from "@/types/Index";
import { Reservation } from "@prisma/client"
import axios from "axios";
import { differenceInCalendarDays, differenceInDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection"
};

interface ListingClientProps {
      reservations?: SafeReservation[];
      listing: safeListings & { user: SafeUser }
      currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({ reservations = [], listing, currentUser }) => {

      const category = useMemo(() => {
            return categories.find(item => item.label === listing.category)
      }, [listing.category])

      const loginModel = useLoginModel();
      const router = useRouter();

      const disabledDates = useMemo(() => {
            let dates: Date[] = [];
            reservations.forEach(reservation => {
                  const range = eachDayOfInterval({
                        start: new Date(reservation.startDate),
                        end: new Date(reservation.endDate)
                  });
                  dates = [...dates, ...range];
            });
            return dates;
      }, [reservations])

      const [isLoading, setIsLoading] = useState(false);
      const [totalPrice, setTotalPrice] = useState(listing.price);
      const [dateRange, setDateRange] = useState<Range>(initialDateRange);

      const onCreateReservation = useCallback(() => {
            if (!currentUser) {
                  return loginModel.onOpen();
            }
            setIsLoading(true);
            axios.post('/api/reservations', {
                  totalPrice,
                  startDate: dateRange.startDate,
                  endDate: dateRange.endDate,
                  listingId: listing?.id
            }).then(() => {
                  toast.success("Reservation created successfully");
                  setDateRange(initialDateRange)
                  // redirect to /trips
                  router.push('/trips');
            }).catch(() => {
                  toast.error("Something went wrong");
            }).finally(() => {
                  setIsLoading(false);
            })
      }, [totalPrice, dateRange, listing?.id, currentUser, loginModel, router]);

      useEffect(() => {
            if (dateRange.startDate && dateRange.endDate) {
                  const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);
                  if (dayCount && listing.price) {
                        setTotalPrice(dayCount * listing.price);
                  }else{
                        setTotalPrice(listing.price)
                  }
            };

      }, [dateRange, listing.price])

      return (
            <Container>
                  <div className="max-w-7xl mx-auto px-5">
                        <div className="flex flex-col gap-6 overflow-hidden">
                              <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} currentUser={currentUser} />
                              <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                                    <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
                                    <div className="order-first mb-10 md:order-last md:col-span-3 ">
                                          <ListingReservation price={listing.price} totalPrice={totalPrice} 
                                          onChangeDate={(value)=> setDateRange(value)} dateRange={dateRange} 
                                          onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates} />
                                    </div>
                              </div>
                        </div>
                  </div>
            </Container>
      )
}

export default ListingClient