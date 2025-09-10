import { KAKAO_JAVASCRIPT_KEY } from "@/constants/keys";
import { AxiosError } from "axios";
import { AuthOptions } from "next-auth";
import KakaoProvider, { KakaoProfile } from "next-auth/providers/kakao";
import { postSocialLogin } from "../postSocialLogin";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/error/auth",
  },
  session: {
    strategy: "jwt", // JWT를 사용하여 세션을 유지
  },
  providers: [
    KakaoProvider({
      clientId: KAKAO_JAVASCRIPT_KEY,
      clientSecret: `${process.env.KAKAO_CLIENT_SECRET}`,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "이메일",
    //       type: "email",
    //       placeholder: "이메일 주소를 입력해주세요.",
    //     },
    //     password: {
    //       label: "비밀번호",
    //       type: "password",
    //       placeholder: "비밀번호를 입력해주세요.",
    //     },
    //   },
    //   async authorize(credentials, req) {
    //     const res = await fetch(`/server/login`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         username: credentials?.email,
    //         password: credentials?.password,
    //       }),
    //     });
    //     const user = await res.json();
    //     console.log(user);

    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else return null;
    //   },
    // }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (user.email) {
        if (account) {
          try {
            const data = await postSocialLogin({
              token: account.access_token, // 스푸핑 방지
              provider: account.provider,
            });
            user.id = data.email;
            account.access_token = data.accessToken; // 토큰 발급
          } catch (error) {
            const axiosError = error as AxiosError;
            throw new Error(axiosError.status?.toString());
          }

          if (account.provider === "kakao") {
            const kakaoProfile = (profile as KakaoProfile).kakao_account;
            account.isDefaultImg = kakaoProfile?.profile?.is_default_image;
          }
        }
        return true;
      }
      return false;
    },
    async jwt({ token, account, user, trigger }) {
      if (user && account) {
        token.accessToken = account.access_token;

        // 애플리케이션 전용 accessToken 발급 (내부 로직 또는 API 호출)
        // const accessToken = await getAccessToken(account.provider, account.access_token);
        // // 추가 사용자 정보 조회
        // const userInfo = await getUserInfo(accessToken);
      } else if (trigger === "update") {
        // 세션 갱신 시 OAuth 토큰으로 애플리케이션 토큰 재발급
        // const accessToken = await getAccessToken(token.user.provider, token.user.oauthToken);
        // const userInfo = await getUserInfo(accessToken);
      }
      return {
        user: { ...user, isDefaultImg: account?.isDefaultImg },
        auth: { type: account?.type, provider: account?.provider },
        ...token,
      };
    },
    async session({ session, token: jwt }) {
      session.accessToken = jwt.accessToken;
      session = jwt as any;
      // console.log("$$$ session: ", session);
      return session;
    },
  },
};
