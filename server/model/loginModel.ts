import { z, infer as Infer} from 'zod';

export interface LoginModel {
    username: string
    passphrase: string
}

export const LoginModel = z.object({
    username: z.string(),
    passphrase: z.string()
});

type LoginModelType = Infer<typeof LoginModel>;