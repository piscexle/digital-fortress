'use client';

import React from 'react';
import { CustomChat, FacebookProvider } from 'react-facebook';

const BoxMessenger = () => (
  <FacebookProvider appId="764815948846564" chatSupport>
    <CustomChat pageId="185209091351563" minimized />
  </FacebookProvider>
);

export default BoxMessenger;
