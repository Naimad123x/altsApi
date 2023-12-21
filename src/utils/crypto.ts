import crypto from 'crypto';
export function generatePassword(): string {
  return crypto.randomBytes(32).toString('hex');
}
export function generateSalt(): string {
  return crypto.randomBytes(16).toString('hex');
}
export function generateClient(id: string, name: string): string {
  return crypto.createHash('md5').update(name+id).digest('hex');
}
export async function generateKey(password: string, salt: string): Promise<string> {
  const iterations = 20000;
  const keyLength = 64;
  const digest = 'sha512';
  const key = await crypto.pbkdf2Sync(password, salt, iterations, keyLength, digest);
  return key.toString('hex');
}

export async function verifyLogin(inputKey: string, storedKey: string, salt: string): Promise<boolean> {
  const inputKeyHash = await generateKey(inputKey, salt);
  return inputKeyHash === storedKey;
}
