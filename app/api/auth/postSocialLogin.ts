import { SERVER_URL } from "@/constants/keys";
import axios from "axios";

interface PostSocialLogin {
  email: string | undefined;
  provider: string | undefined;
}

interface LoginResponse {
  email: string;
}

export async function postSocialLogin({
  email,
  provider,
}: PostSocialLogin): Promise<LoginResponse> {
  const url = SERVER_URL + "/api/auth/social-login";
  const data = {
    provider: provider,
    email: email,
  };

  const response = await axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
}
