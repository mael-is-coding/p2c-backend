import { UserSequelize } from '../model/User.ts';

export function WriteDatabase({ force }:{ force: boolean }) {
    UserSequelize.sync({force: force});
}