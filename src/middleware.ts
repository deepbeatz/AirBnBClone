import NextAuth from 'next-auth';


import { authOptions } from './providers/Auth';

const { auth } = NextAuth(authOptions);

export default auth((req:any) => {
 const { nextUrl } = req;

 const isAuthenticated = !!req.auth;
 
 if (isAuthenticated)
  return Response.redirect(new URL("/", nextUrl));

 if (!isAuthenticated)
  return Response.redirect(new URL("/", nextUrl));
});

export const config = { 
      matcher: [
            "/trips",
            "/reservations",
            "/myProperties",
            "/favorites",
      ] 
};