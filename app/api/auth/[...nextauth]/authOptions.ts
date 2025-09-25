import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User as UserModel } from "@/models/Model";
import { TUser } from "@/lib/db";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role: string;
  }
}
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "name@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user: TUser = (await UserModel.findOne({
          email: credentials?.email,
        })) as TUser;
        if (user) {
          const samePassword = user.password === credentials?.password;
          if (samePassword) {
            return {
              id: user._id,
              role: user.role,
              email: user.email,
              image: user.avatar,
              name: user.name,
            };
          }
          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Called when user signs in
    async signIn({ user }) {
      let existingUser = await UserModel.findOne({ email: user.email });

      if (!existingUser) {
        existingUser = await UserModel.create({
          name: user.name,
          email: user.email,
          avatar: user.image,
        });
      }

      user.id = existingUser._id;
      user.role = existingUser.role;
      user.email = existingUser.email;
      user.image = existingUser.avatar;
      user.name = existingUser.name;

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
      } else {
        const dbUser = await UserModel.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.image = dbUser.avatar;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token?.id as string;
        session.user.image = token?.image as string;
        session.user.role = token?.role as string;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
