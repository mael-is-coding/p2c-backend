
import zod from "@zod/zod";

export const P2C = zod.object({
    id: zod.number(),
    uid: zod.number(),
    name: zod.string(),
    description: zod.string().nullable().optional(),
    longitude: zod.float64(),
    latitude: zod.float64()
});
export const P2CListZod = P2C.array();
export const P2CTypeZod = P2C.omit({id: true});
export const PartialP2CZod = P2C.partial();

export type P2CType = zod.infer<typeof P2CTypeZod>;
export type P2CDatabaseType = zod.infer<typeof P2C>;
export type PartialP2C = zod.infer<typeof PartialP2CZod>;