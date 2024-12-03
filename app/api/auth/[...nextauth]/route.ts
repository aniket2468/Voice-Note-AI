import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { FirestoreAdapter } from '@auth/firebase-adapter';
import { db } from '@/lib/firebase';


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: FirestoreAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export { handler as GET, handler as POST };