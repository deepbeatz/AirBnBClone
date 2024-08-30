import EmptyState from "@/components/shared/EmptyState";
import ClientOnly from "@/components/shared/ClientOnly";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
      const listings = await getFavoriteListings();
      const currentUser = await getCurrentUser();
      if(listings.length===0){
            return (
                  <ClientOnly>
                        <EmptyState title="No favorites" subtitle="Go add some!" />
                  </ClientOnly>
            )
      }

      return (
            <ClientOnly>
                  <FavoritesClient listings={listings} currentUser={currentUser} />
            </ClientOnly>
      )
}

export default ListingPage