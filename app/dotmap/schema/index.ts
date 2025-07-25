import { z } from "zod";

export const DotmapSchema = z.object({
  keyword: z.string(),
});
