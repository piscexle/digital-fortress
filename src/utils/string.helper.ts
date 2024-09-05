import { FileTypeEnum } from '@/config/constant';

export const checkTypeFile = (url: string) => {
  try {
    const urls = url.split('.');
    const endUrl = (
      urls.length > 0 ? urls[urls.length - 1] : ''
    ).toLocaleLowerCase();
    switch (endUrl) {
      case 'jpeg':
      case 'jpg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'webp':
        return FileTypeEnum.image;
      case 'mp4':
      case 'quicktime':
      case 'webm':
      case 'ogg':
      case 'avi':
        return FileTypeEnum.video;
      default:
        return FileTypeEnum.file;
    }
  } catch {
    return FileTypeEnum.image;
  }
};
