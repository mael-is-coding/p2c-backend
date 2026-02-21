import zod from "@zod/zod";

// s_* : to avoid property shadowing from Zod
const FailureResponseZod = zod.object({
    s_success: zod.literal(false),
    s_text: zod.string(),
    s_error: zod.unknown().nullable(),
});

const SuccessResponseZod = zod.object({
    s_success: zod.literal(true),
    s_text: zod.string(),
    s_data: zod.unknown().nullable()
});

export const ServerResponseZod = zod.discriminatedUnion("s_success", [
    SuccessResponseZod,
    FailureResponseZod
]);

export type Failure = zod.infer<typeof FailureResponseZod>;
export type Success = zod.infer<typeof SuccessResponseZod>;
export type ServerResponse = zod.infer<typeof ServerResponseZod>;