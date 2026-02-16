
import bcrypt from "bcryptjs";

const compare = (passphrase: string, hash: string) => {
    return bcrypt.compareSync(passphrase, hash);
}

const hash = (passphrase: string) => {
    return bcrypt.hashSync(passphrase);
}

const EncryptionService = {
    compare,
    hash
}

export default EncryptionService;