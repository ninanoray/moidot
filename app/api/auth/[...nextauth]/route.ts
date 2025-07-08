import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt", // JWT를 사용하여 세션을 유지
  },
  providers: [
    KakaoProvider({
      clientId: KAKAO_JAVASCRIPT_KEY,
      clientSecret: `${process.env.KAKAO_CLIENT_SECRET}`,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "이메일",
          type: "email",
          placeholder: "이메일 주소를 입력해주세요.",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력해주세요.",
        },
      },
      async authorize(credentials, req) {
        const res = await fetch(`/server/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.email,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log(user);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      console.log("$$$ token: ", token);
      session.user = token as any;
      console.log("$$$ session: ", session);
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { authOptions, handler as GET, handler as POST };
