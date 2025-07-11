import { FileTypeWhitelist, RegexPassword } from "@/constants";
import { z } from "zod";

export const TypeSelection = [
  { value: "TES_CLI01_PRO15", label: "일일업무보고" },
  { value: "TES_CLI01_PRO09", label: "주간보고" },
];

const typeEnum = TypeSelection.map(
  (type) => type.value
) as unknown as readonly [string, ...string[]];

const fileSizeMax = 5;

export const HomeSchema = z.object({
  password: z
    .string({
      required_error: "비밀번호를 입력해주세요.",
    })
    .regex(RegexPassword.regex, RegexPassword.message),
  type: z.enum(typeEnum, {
    required_error: "타입을 선택해주세요.",
  }),
  date: z.date({
    required_error: "날짜를 선택해주세요.",
  }),
  dateRange: z
    .object(
      {
        from: z.date(),
        to: z.date(),
      },
      { required_error: "기간을 선택해주세요." }
    )
    .refine(
      (data) => data.from <= data.to,
      "종료일이 시작일보다 나중이어야 합니다."
    ),
  text: z.string({
    required_error: "내용을 입력해주세요.",
  }),
  files: z
    .array(z.instanceof(File))
    .max(3, "3개 이하로 선택해주세요.")
    .refine(
      (files) =>
        files?.every((file) =>
          FileTypeWhitelist.find((type) => file?.type.includes(type))
        ),
      "유효하지 않은 파일입니다"
    )
    .refine(
      (files) =>
        files?.every((file) => file?.size <= fileSizeMax * 1000 * 1000),
      `등록 가능한 최대 파일 사이즈는 ${fileSizeMax}MB 입니다.`
    )
    .optional(),
});
