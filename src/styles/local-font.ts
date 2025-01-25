import localFont from 'next/font/local';

export const Satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Bold.otf',
      weight: '600',
      style: 'normal',
    },
  ],
});
