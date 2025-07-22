import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import axios from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import { ur } from "zod/v4/locales";

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
      // authorization: {
      //   url: "https://kauth.kakao.com/oauth/authorize",
      //   params: {
      //     redirect_uri: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback/kakao`, // Kakao 콘솔과 일치해야 함
      //     response_type: "code",
      //   },
      // },
      // token: "https://kauth.kakao.com/oauth/token",
      // userinfo: "https://kapi.kakao.com/v2/user/me",
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
      const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/social-login`;
      const data = {
        provider: account?.provider,
        email: user.email,
      };

      try {
        const reponse = await axios.post(url, data);
        console.log(reponse.data);
      } catch (error) {
        console.log(data, error);
      }

      if (account?.provider) {
        // user.id = data.user.id;
        // user.name = data.user.name;
        // account.access_token = data.token.accessToken;
      }

      return true;
    },
    async jwt({ token, account, user }) {
      // if (account?.access_token) {
      //   //백엔드에게 줄 토큰 encoded 실행
      //   const encodedToken = encodeURIComponent(account.access_token);
      //   const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/social-login`;

      //   const response = await fetch(url, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   });

      //   if (response.ok) {
      //     const data = await response.json();
      //     token.accessToken = data.token.accessToken; // 백엔드에서 받은 토큰 저장
      //     token.refreshToken = data.token.refreshToken; // 리프레시 토큰이 있다면 저장

      //     return token;
      //   }
      // }

      return { user, auth: { ...account }, ...token };
    },
    async session({ session, token: jwt }) {
      session = jwt as any;
      // console.log("$$$ session: ", session);
      return session;
    },
  },
};
