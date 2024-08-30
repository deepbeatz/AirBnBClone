import { getCurrentUser } from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById"
import ClientOnly from "@/components/shared/ClientOnly";
import EmptyState from "@/components/shared/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/actions/getReservations";

interface IParams {
      listingId?: string
}


const ListingPage = async ({ params }: { params: IParams }) => {
      const listing = await getListingById(params);
      const reservations = await getReservations(params)
      const currentUser = await getCurrentUser();
      if (!listing) {
            return (
                  <ClientOnly>
                        <EmptyState />
                  </ClientOnly>
            )
      }
      return (
            <ClientOnly>
                  <ListingClient
                        listing={listing}
                        currentUser={currentUser}
                        reservations={reservations}
                  />
            </ClientOnly>
      )
}

export default ListingPage