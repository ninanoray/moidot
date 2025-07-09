import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string({
    required_error: "이메일을 입력해주세요.",
  }),
  password: z.string({
    required_error: "비밀번호를 입력해주세요.",
  }),
});
