import { AxiosError } from "axios";

type ErrorCodeType = {
  [key: string]: { code: string; message: string; requireLogin?: boolean };
};

export const ERROR_CODE: ErrorCodeType = {
  default: { code: "ERROR", message: "알 수 없는 오류가 발생했습니다." },

  // axios error
  ERR_NETWORK: {
    code: "통신 에러",
    message:
      "서버가 응답하지 않습니다. \n프로그램을 재시작하거나 관리자에게 연락하세요.",
  },
  ECONNABORTED: {
    code: "요청 시간 초과",
    message: "요청 시간을 초과했습니다.",
  },

  // http status code 및 정의 된 코드
  400: {
    code: "400",
    message: "잘못된 요청입니다.\n요청 내용을 확인해 주세요.",
  },
  401: {
    code: "401",
    message: "	인증이 필요합니다.\n로그인 후 다시 시도해 주세요.",
    requireLogin: true,
  },
  4011: {
    code: "4011",
    message: "인증이 만료되었습니다.\n로그인 후 다시 시도해 주세요.",
    requireLogin: true,
  },
  403: { code: "403", message: "권한이 없습니다." },
  404: { code: "404", message: "요청하신 페이지를 찾을 수 없습니다." },
  408: {
    code: "408",
    message: "요청 시간이 초과되었습니다.\n다시 시도해 주세요.",
  },
  415: {
    code: "415",
    message: "지원하지 않는 미디어 형식입니다.",
  },
  429: {
    code: "429",
    message: "요청이 너무 많습니다.\n잠시 후 다시 시도해 주세요.",
  },
  500: {
    code: "500",
    message: "서버 내부 오류입니다.\n관리자에게 문의해 주세요.",
  },
  501: {
    code: "501",
    message: "요청한 기능이 구현되어 있지 않습니다.",
  },
  502: {
    code: "502",
    message: "게이트웨이에서 잘못된 응답을 받았습니다.",
  },
  503: {
    code: "503",
    message:
      "현재 서버를 일시적으로 사용할 수 없습니다.\n나중에 다시 시도해 주세요.",
  },
  504: {
    code: "504",
    message: "게이트웨이 시간 초과입니다.",
  },

  //oauth
  OAuthCallback: {
    code: "oauth",
    message: "oauth 콜백 오류입니다.",
  },
} as const;

export const getErrorDataByCode = (error: AxiosError | string | null) => {
  if (typeof error !== "string") {
    const httpErrorCode = error?.response?.status ?? "";
    const axiosErrorCode = error?.code ?? "";

    if (httpErrorCode in ERROR_CODE) {
      return ERROR_CODE[httpErrorCode as keyof typeof ERROR_CODE];
    }
    if (axiosErrorCode in ERROR_CODE) {
      return ERROR_CODE[axiosErrorCode as keyof typeof ERROR_CODE];
    }
  } else {
    if (error in ERROR_CODE) {
      return ERROR_CODE[error as keyof typeof ERROR_CODE];
    }
  }
  return ERROR_CODE.default;
};
