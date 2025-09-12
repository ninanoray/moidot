// 파일 업로드 가능 목록
export const FileTypeWhitelist = [
  "text/plain",
  "application/pdf",
  "image/",
  "application/vnd.openxmlformats-officedocument",
];

// 비밀번호 정규식
export const RegexPassword = {
  regex: new RegExp(/[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}/),
  message: "영문, 숫자, 특수문자를 혼합해 8~20자리로 입력해주세요.",
};

/**
 * 로그인을 하지 않아도 외부에 노출되는 메뉴(페이지) 목록
 */
export const PublicPages = ["/", "/dotmap"];
/**
 * 스와이프 제스쳐를 가장자리(edge)에서만 실행하는 페이지 목록
 */
export const EdgeSwipePages = ["/dotmap"];

/**
 * 화면 당겨서 새로 고침기능의 당겨짐 민감도
 */
export const PULL_SENSITIVITY = 0.8;
