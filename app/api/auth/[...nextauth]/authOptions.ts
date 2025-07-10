import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: AuthOptions = {
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
    async signIn({ user, account }) {
      // const data = await postLogin(account?.access_token || ""); // 서버와의 통신

      if (account?.provider) {
        // user.id = data.user.id;
        // user.name = data.user.name;
        // account.access_token = data.token.accessToken;
      }

      return true;
    },
    async jwt({ token, account, user }) {
      return { user, auth: { ...account }, ...token };
    },
    async session({ session, token: jwt }) {
      session = jwt as any;
      console.log("$$$ session: ", session);
      return session;
    },
  },
};
