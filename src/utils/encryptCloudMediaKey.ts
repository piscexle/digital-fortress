import cryptoJs from 'crypto-js';

export const encryptCloudMediaKey = () =>
  cryptoJs.AES.encrypt(Date.now().toString(), process.env.NEXT_PUBLIC_UPLOAD as string).toString();
