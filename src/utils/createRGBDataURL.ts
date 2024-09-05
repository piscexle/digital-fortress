const createRGBDataURL = (red: number, green: number, blue: number, isTransparent?: number) => {
  const keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

  return `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(isTransparent || 0, red, green)}${triplet(
    blue,
    255,
    255
  )}/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
};
export { createRGBDataURL };
