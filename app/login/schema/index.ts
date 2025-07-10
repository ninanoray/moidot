import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "이메일을 입력해주세요.",
    })
    .email("유효한 이메일 주소가 아닙니다."),
  password: z.string({
    required_error: "비밀번호를 입력해주세요.",
  }),
});
