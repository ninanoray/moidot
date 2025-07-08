import "next-auth";

declare module "next-auth" {
  interface JWT {
    accessToken: string;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  }
}
