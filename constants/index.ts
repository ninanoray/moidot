// 파일 업로드 가능 목록
export const FILE_TYPE_WHITELIST = [
  "text/plain",
  "application/pdf",
  "image/",
  "application/vnd.openxmlformats-officedocument",
];

// 비밀번호 정규식
export const REGEX_PASSWORD = {
  regex: new RegExp(/[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}/),
  message: "영문, 숫자, 특수문자를 혼합하여 8~20자리 이내로 입력해주세요.",
};
