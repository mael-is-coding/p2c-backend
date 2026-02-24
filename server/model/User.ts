import zod from '@zod/zod';

export const User = zod.object({
    id: zod.number(),
    username: zod.string(),
    name: zod.string(),
    email: zod.email(),
    password: zod.string(),
    phonenumber: zod.string(),
    profile_picture: zod.base64()
});
export const UserTypeZod = User.omit({id: true});
export const PartialUserTypeZod = User.partial();

export type UserDatabaseType = zod.infer<typeof User>;
export type UserType = zod.infer<typeof UserTypeZod>;
export type PartialUserType = Partial<UserType>;

