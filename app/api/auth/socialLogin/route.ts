import { SERVER_URL } from "@/constants/keys";
import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const url = SERVER_URL + "/api/auth/social-login";
  const body = await req.json();

  // axios.defaults.withCredentials = true;

  try {
    // 백엔드 서버 호출
    const apiRes = await axios.post(url, body, {
      withCredentials: true, // 서버 간 쿠키 포함
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });

    // access token
    const resHeaders = apiRes.headers;
    axios.defaults.headers.common["Authorization"] =
      resHeaders["authorization"];

    // refresh token: 백엔드에서 받은 Set-Cookie 가져오기
    const setCookie = apiRes.headers["set-cookie"];
    if (setCookie) {
      response.headers.set(
        "Set-Cookie",
        Array.isArray(setCookie) ? setCookie.join(",") : setCookie
      );
    }

    return response;
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json(
      { message: axiosError.message || "소셜 로그인 실패." },
      { status: axiosError.response?.status || 500 }
    );
  }
}
