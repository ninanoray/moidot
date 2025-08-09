import { SERVER_URL } from "@/constants/keys";
import axios from "axios";
import { cookies } from "next/headers";

interface PostSocialLogin {
  email: string | undefined;
  provider: string | undefined;
}

interface LoginResponse {
  email: string;
}

function parseSetCookie(setCookieStr: string): Record<string, string> {
  const parts = setCookieStr.split(";").map((part) => part.trim());
  const [nameValue, ...attributes] = parts;

  const [name, value] = nameValue.split("=");

  const cookieObj: Record<string, string> = {
    [name]: value,
  };

  for (const attr of attributes) {
    const [attrName, attrValue = true] = attr.split("=");
    cookieObj[attrName.toLowerCase()] = attrValue === true ? "" : attrValue;
  }

  return cookieObj;
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

  // axios.defaults.withCredentials = true;

  const response = await axios.post(url, data, {
    // headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });

  // access token
  const resHeaders = response.headers;
  axios.defaults.headers.common["Authorization"] = resHeaders["authorization"];

  // refresh token
  const setCookie = resHeaders["set-cookie"];
  if (setCookie) {
    const tokenCookie = parseSetCookie(setCookie[0]);
    const cookieStore = await cookies();
    cookieStore.set("refreshToken", tokenCookie.refreshToken, {
      maxAge: Number(tokenCookie["max-age"]),
      expires: new Date(tokenCookie.expires),
      httpOnly: true,
    });
  }

  return response.data;
}
