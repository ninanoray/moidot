import { z } from "zod";

export const HomeSchema = z.object({
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
});
