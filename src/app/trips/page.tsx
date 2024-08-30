import EmptyState from "@/components/shared/EmptyState"
import ClientOnly from "@/components/shared/ClientOnly"
import { getCurrentUser } from "@/actions/getCurrentUser"
import getReservations from "@/actions/getReservations"
import TripsClient from "./TripsClient"


const TripsPage = async () => {

      const currentUser = await getCurrentUser()
      if(!currentUser){
            return(
                  <ClientOnly>
                        <EmptyState title="unauthorized" subtitle="please login" />
                  </ClientOnly>
            )
      }

      const reservations = await getReservations({userId: currentUser.id})
      if(reservations.length === 0){
            return(
                  <ClientOnly>
                        <EmptyState title="No trips found" subtitle="You have no trips reserved" />
                  </ClientOnly>
            )
      }

      return (
            <ClientOnly>
                  <TripsClient reservations={reservations} currentUser={currentUser}/>
            </ClientOnly>
      )
}

export default TripsPage