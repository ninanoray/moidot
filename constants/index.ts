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
