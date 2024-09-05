import cryptoJs from 'crypto-js';

export const encryptSocketToken = (userId: string): string => cryptoJs.AES.encrypt(
    Date.now().toString() + userId,
    process.env.NEXT_PUBLIC_SOCKET_TOKEN as string
  ).toString();
