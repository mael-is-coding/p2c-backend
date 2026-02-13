import { z, infer as Infer} from 'zod';

export const LoginModel = z.object({
    username: z.string(),
    password: z.string()
});
export type LoginModelType = Infer<typeof LoginModel>;

export const LoginModelWithEmail = z.object({
    email: z.email(),
    password: z.string()
});
export type LoginModelWithEmailType = Infer<typeof LoginModelWithEmail>