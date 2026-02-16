
import zod from "@zod/zod";

export const FailureResponseZod = zod.object({
    success: zod.boolean(),
    text: zod.string(),
    error: zod.unknown(),
});

export const SuccessResponseZod = zod.object({
    success: zod.boolean(),
    text: zod.string(),
    data: zod.unknown().optional().nullable()
});

export type Failure = zod.infer<typeof FailureResponseZod>;
export type Success = zod.infer<typeof SuccessResponseZod>;