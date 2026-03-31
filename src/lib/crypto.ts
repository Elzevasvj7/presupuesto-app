import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";

function resolveEncryptionKey(): Buffer {
  const rawKey = process.env.BINANCE_ENCRYPTION_KEY;
  if (!rawKey) {
    throw new Error("Missing BINANCE_ENCRYPTION_KEY environment variable");
  }

  // Accept 64-char hex keys directly, otherwise derive 32 bytes from passphrase.
  if (/^[a-fA-F0-9]{64}$/.test(rawKey)) {
    return Buffer.from(rawKey, "hex");
  }

  return crypto.createHash("sha256").update(rawKey).digest();
}

export type EncryptedPayload = {
  encrypted: string;
  iv: string;
  authTag: string;
};

export function encryptText(plainText: string): EncryptedPayload {
  const key = resolveEncryptionKey();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return {
    encrypted: encrypted.toString("base64"),
    iv: iv.toString("base64"),
    authTag: authTag.toString("base64"),
  };
}

export function decryptText(payload: EncryptedPayload): string {
  const key = resolveEncryptionKey();
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    key,
    Buffer.from(payload.iv, "base64"),
  );

  decipher.setAuthTag(Buffer.from(payload.authTag, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(payload.encrypted, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
