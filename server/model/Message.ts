
import zod from "zod";

export const Message = zod.object({
    sender_id: zod.number(),
    receiver_id: zod.number(),
    content: zod.string(),
    attachment: zod.array(zod.uint32()),
});