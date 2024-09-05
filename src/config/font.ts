import { Roboto, Poppins } from 'next/font/google';

export const font = Roboto({
  subsets: ['latin'],
  weight: ['700', '500', '400'],
  display: 'swap',
  style: ['normal', 'italic'],
});

export const adminFont = Poppins({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  style: ['normal'],
  variable: '--admin-font',
});
