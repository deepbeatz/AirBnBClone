'use client';

import Container from "@/components/shared/Container";
import Heading from "@/components/shared/Heading";
import ListingCard from "@/components/ui/listings/ListingCard";
import { SafeUser, safeListings } from "@/types/Index";

interface FavoritesClientProps {
      listings: safeListings[];
      currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings, currentUser }) => {
      return (
            <Container>
                  <Heading title="Favorites" subtitle="List of places you have favorited!"/>
                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                        {listings.map(listing =>(
                              <ListingCard currentUser={currentUser} data={listing} key={listing.id} />
                        ))}
                  </div>
            </Container>
      )
}

export default FavoritesClient