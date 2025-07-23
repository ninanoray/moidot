import axios from "axios";

interface PostSocialLogin {
  email: string | undefined;
  provider: string | undefined;
}

interface LoginResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}

export async function postSocialLogin({
  email,
  provider,
}: PostSocialLogin): Promise<LoginResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/social-login`;
  const data = {
    provider: provider,
    email: email,
  };

  const response = await axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
