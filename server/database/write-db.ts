import { UserSequelize } from '../model/user.ts';

export function WriteDatabase({ force }:{ force: boolean }) {
    UserSequelize.sync({force: force});
}