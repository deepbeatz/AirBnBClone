export { auth as middleware } from "@/providers/Auth"


export const config = { 
      matcher: [
            "/trips",
            "/reservations",
            "/myProperties",
            "/favorites",
      ] 
};