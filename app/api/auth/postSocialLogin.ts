import { SERVER_URL } from "@/constants/keys";
import axios from "axios";
import { cookies } from "next/headers";

interface PostSocialLogin {
  token: string | undefined;
  provider: string | undefined;
}

interface LoginResponse {
  email: string;
  accessToken: string;
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
  token,
  provider,
}: PostSocialLogin): Promise<LoginResponse> {
  const url = SERVER_URL + "/api/auth/social-login";
  const data = {
    provider: provider,
    accessToken: token,
  };

  axios.defaults.withCredentials = true;

  const response = await axios.post(url, data, {
    headers: { "Content-Type": "application/json" },
  });

  const resHeaders = response.headers;

  // access token
  const accessToken = resHeaders["authorization"];
  axios.defaults.headers.common["Authorization"] = accessToken;

  // refresh token
  const setCookie = resHeaders["set-cookie"];
  if (setCookie) {
    const tokenCookie = parseSetCookie(setCookie[0]);

    const coockieStore = await cookies();
    coockieStore.set("m_refreshToken", tokenCookie.m_refreshToken, {
      maxAge: Number(tokenCookie["max-age"]),
      expires: new Date(tokenCookie.expires),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
  }

  return { accessToken, ...response.data };
}
