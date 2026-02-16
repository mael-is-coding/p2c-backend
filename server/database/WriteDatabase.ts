import { UserSequelize } from '../model/User.ts';

export function WriteDatabase({ alter }:{ alter: boolean }) {
    UserSequelize.sync({alter: alter});
}