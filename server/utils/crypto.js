const crypto = require("crypto")
const bcrypt = require("bcryptjs");

const CRYPTO = class {

    // 256 bits so 32 characters MAX
    static ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "9cAH8nBqBQfLRpbCNRB84snJem5FgXPc";
    static IV_LENGTH = 16;

    static encrypt(str) {
        let iv = crypto.randomBytes(CRYPTO.IV_LENGTH);
        let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(CRYPTO.ENCRYPTION_KEY), iv);
        let encrypted = Buffer.concat([cipher.update(str), cipher.final()]);

        return iv.toString("base64") + ':' + encrypted.toString("base64");
    }

    static decrypt(hash) {

        let strParts = hash.split(':');

        let iv = Buffer.from(strParts.shift(), "base64");
        let encryptedText = Buffer.from(strParts.join(':'), "base64");
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(CRYPTO.ENCRYPTION_KEY), iv);
        let decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);

        return decrypted.toString();
    }

    constructor() {};

}

const BCRYPT = class {

    static ROUNDS = 10;

    static async hash(str) {
        return await bcrypt.hash(str, BCRYPT.ROUNDS);
    }

    static async compare(firstStr, secondStr) {
        const isPasswordMatch = await bcrypt.compare(firstStr, secondStr);
        return !!isPasswordMatch;
    }
};

module.exports = { CRYPTO, BCRYPT };