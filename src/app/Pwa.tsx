'use client';

import { useEffect } from 'react';

export default function Pwa() {
  let sw: ServiceWorkerContainer | undefined;

  if (typeof window !== 'undefined') {
    sw = window?.navigator?.serviceWorker;
  }

  useEffect(() => {
    if (sw) {
      sw.register(`/sw.js`, { scope: `/admin/login` })
        .then((registration) => {
          // eslint-disable-next-line no-console
          console.log('Service Worker registration successful with scope: ', registration.scope);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.log('Service Worker registration failed: ', err);
        });
    }
  }, [sw]);

  // Return null instead of <Fragment />
  return null;
}
