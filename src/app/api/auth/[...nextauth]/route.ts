import NextAuth from 'next-auth';
import { authOptions } from '@/providers/Auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };