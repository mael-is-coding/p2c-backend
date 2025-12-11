import { z, infer as Infer} from 'zod';

export interface LoginModel {
    username: string
    passphrase: string
}

export const LoginModel = z.object({
    username: z.string(),
    password: z.string()
});

export type LoginModelType = Infer<typeof LoginModel>;