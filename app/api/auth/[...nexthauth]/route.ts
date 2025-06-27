import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";

const handler = NextAuth({
  providers: [
    // ID, PW 로그인 방식
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 주소를 입력해 주세요.",
        },
        password: { label: "비밀번호", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          return null;
        }
      },
    }),
    // 카카오 로그인 방식
    KakaoProvider({
      clientId: KAKAO_JAVASCRIPT_KEY!,
      clientSecret: KAKAO_JAVASCRIPT_KEY!,
    }),
  ],
});

export { handler as GET, handler as POST };
