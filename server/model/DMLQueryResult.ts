import zod from "@zod/zod";

export const DMLQueryResultZod = zod.object({
    affected_rows: zod.number()
});

export type DMLQueryResult = zod.infer<typeof DMLQueryResultZod>;