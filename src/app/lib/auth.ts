import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
};
